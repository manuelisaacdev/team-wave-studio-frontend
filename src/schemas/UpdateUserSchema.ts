import * as yup from "yup";

export default yup.object({
    name: yup.string().required("O nome é requerido."),
    gender: yup.string().required("O gênero é requerido."),
    dateOfBirth: yup.string().required("A data de nascimento é requerida."),
    countryId: yup.string().required("A região/nacionalidade é requerida."),
});