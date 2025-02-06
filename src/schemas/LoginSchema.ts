import * as yup from "yup";

export default yup.object({
    email: yup.string().email().required("O email é requerido."),
    password: yup.string().required("A senha é requerida."),
    rememberMe: yup.boolean()
});