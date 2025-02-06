import * as yup from "yup";

const now = new Date();
const MAX_YEAR = now.getFullYear();
const MIN_YEAR = now.getFullYear() - 100;

export default yup.object({
    name: yup.string().required("O nome artístico é requerido."),
    debutYear: yup.number().required("O ano de estreia é requerido.")
    .default(now.getFullYear())
    .min(MIN_YEAR, "Ano de início de carreira inválida.")
    .max(MAX_YEAR, "O ano de início de carreira não pode exceder o ano atual."),
    biography: yup.string().required("a biografia é requerida."),
});