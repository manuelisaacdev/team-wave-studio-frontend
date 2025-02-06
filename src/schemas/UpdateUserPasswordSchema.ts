import * as yup from "yup";

export default yup.object({
    currentPassword: yup.string().required("A senha atual é requerida."),
    newPassword: yup.string().required("A nova senha é requerida.")
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .max(32, "A senha deve ter no máximo 32 caracteres."),
    confirmNewPassword: yup.string().oneOf([yup.ref("newPassword"), undefined], "As palavras-passe devem corresponder").required("A confirmação da senha é requerida."),
});