import * as yup from "yup";
import Privacy from "@/interfaces/Privacy";

export default yup.object({
    name: yup.string().required("O nome é requerido."),
    albumType: yup.string().required("O tipo de album é requerido."),
    releaseDate: yup.string().required("A data de lançamento é requerida"),
    description: yup.string().required("A descrição do album é requerida."),
    privacy: yup.string().required("A privacidade é requerida.").default(Privacy.PUBLIC),
});