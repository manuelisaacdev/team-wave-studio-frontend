import * as yup from "yup";
import { Gender } from "@/interfaces/User";

const now = new Date();
const MAX_YEAR = now.getFullYear();
const MIN_YEAR = now.getFullYear() - 100;

export default yup.object({
    name: yup.string().required("O nome é requerido."),
    email: yup.string().email().required("O email é requerido."),
    gender: yup.string().required("O gênero é requerido.").default(Gender.MALE),
    dateOfBirth: yup.string().required("A data de nascimento é requerida."),
    countryId: yup.string().required("A região/nacionalidade é requerida."),
    password: yup.string().required("A senha é requerida."),
    confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "As palavras-passe devem corresponder").required("A confirmação da senha é requerida."),
    artisticName: yup.string().required("O nome artístico é requerido."),
    debutYear: yup.number().required("O ano de estreia é requerido.")
    .default(now.getFullYear())
    .min(MIN_YEAR, "Ano de início de carreira inválida.")
    .max(MAX_YEAR, "O ano de início de carreira não pode exceder o ano atual."),
    biography: yup.string().required("a biografia é requerida."),
});