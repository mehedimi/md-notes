<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-700/70" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-sidebar text-left align-middle shadow-xl transition-all"
            >
              <TabGroup :default-index="tabActiveIndex">
                <TabList
                  class="mx-6 mt-3 flex gap-x-2 rounded-lg bg-dark py-1 px-1 font-encode shadow-dark"
                >
                  <Tab
                    as="template"
                    v-for="resource in resources"
                    v-slot="{ selected }"
                  >
                    <button
                      class="relative rounded-lg px-6 py-2 transition-colors transition-colors hover:text-white focus:outline-none"
                      :class="selected ? 'bg-sidebar text-white' : 'text-light'"
                    >
                      {{ resource.title }}
                    </button>
                  </Tab>
                </TabList>

                <TabPanels
                  class="mt-2 font-encode focus:outline-0 focus:ring-0"
                >
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
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
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
  },
  setup() {
    const isOpen = ref(false);
    const tabActiveIndex = ref(0);

    function closeModal() {
      isOpen.value = false;
    }
    function openModal(tabIndex = 0, payload = {}) {
      isOpen.value = true;
      tabActiveIndex.value = tabIndex;

      if (!isEmpty(payload)) {
        this.$nextTick(() => {
          this.$refs.resource[0].setPayload(payload);
        });
      }
    }

    return {
      isOpen,
      closeModal,
      openModal,
      resources,
      tabActiveIndex,
    };
  },
};
</script>
