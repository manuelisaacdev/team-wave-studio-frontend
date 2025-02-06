import * as yup from "yup";

export default yup.object({
    token: yup.string().required("O token é requerido."),
    email: yup.string().email().required("O email é requerido."),
    password: yup.string().required("A senha é requerida."),
    confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "As palavras-passe devem corresponder")
    .required("A confirmação da senha é requerida."),
});