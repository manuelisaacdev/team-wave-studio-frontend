import * as yup from "yup";

export default yup.object({
    url: yup.string().required("O link é requerido."),
    socialMediaType: yup.string().required("O tipo de rede social é requerido."),
});