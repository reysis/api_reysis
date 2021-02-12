import { toast } from "react-toastify"

const CONFIG = {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
}

const Toast = {
    info: (msg) => toast.info(msg, CONFIG),
    success: (msg) => toast.success(msg, CONFIG),
    warning: (msg) => toast.warning(msg, CONFIG),
    error: (msg) => toast.error(msg, CONFIG),
    dark: (msg) => toast.dark(msg, CONFIG),
}

export default Toast