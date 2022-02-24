import iziToast from "izitoast"
import 'izitoast/dist/css/iziToast.min.css'

const toast = {
    success(title = 'Success', message) {
        return iziToast.success({
            title,
            message,
            position: 'topRight'
        });
    }
}


export default {
    computed: {
        toast() {
            return toast
        }
    }
}