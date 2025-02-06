import * as yup from "yup";

export default yup.object({
    token: yup.string().required("O token é requerido."),
    email: yup.string().email().required("O email é requerido."),
});