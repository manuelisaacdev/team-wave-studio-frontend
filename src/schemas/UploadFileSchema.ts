import * as yup from "yup";

export default yup.object({
    files: yup.mixed().required("Um arquivo é requerido."),
});