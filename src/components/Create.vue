<template>
  <Modal ref="modal">
    <TabGroup :default-index="tabActiveIndex">
      <TabList
        class="mx-6 mt-5 flex gap-x-2 rounded-lg bg-dark py-1 px-1 font-encode shadow-dark"
      >
        <Tab as="template" v-for="resource in resources" v-slot="{ selected }">
          <button
            class="relative rounded-lg px-6 py-2 transition-colors transition-colors hover:text-white focus:outline-none"
            :class="selected ? 'bg-sidebar text-white' : 'text-light'"
          >
            {{ resource.title }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2 font-encode focus:outline-0 focus:ring-0">
        <TabPanel
          v-for="resource in resources"
          class="rounded-xl px-6 pb-6 pt-2 ring-0"
        >
          <component
            :close-modal="closeModal"
            :is="resource.component"
            ref="resource"
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </Modal>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  TabGroup,
  Tab,
  TabPanel,
  TabList,
  TabPanels,
} from "@headlessui/vue";
import Modal from "./Modal.vue";
import Note from "./Create/Note.vue";
import Folder from "./Create/Folder.vue";
import resources from "../store/resources";
import { ref } from "vue";
import isEmpty from "lodash/isEmpty";
export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    TabGroup,
    TabList,
    TabPanels,
    TabPanel,
    Tab,
    Note,
    Folder,
    Modal,
  },
  setup() {
    const tabActiveIndex = ref(0);
    function openModal(tabIndex = 0, payload = {}) {
      this.$refs.modal.openModal();
      tabActiveIndex.value = tabIndex;

      if (!isEmpty(payload)) {
        this.$nextTick(() => {
          this.$refs.resource[0].setPayload(payload);
        });
      }
    }

    return {
      openModal,
      resources,
      tabActiveIndex,
    };
  },
  methods: {
    closeModal() {
      this.$refs.modal.closeModal();
    },
  },
};
</script>
