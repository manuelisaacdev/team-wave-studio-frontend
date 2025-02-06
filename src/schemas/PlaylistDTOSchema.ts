import Privacy from "@/interfaces/Privacy";
import * as yup from "yup";

export default yup.object({
    description: yup.string(),
    name: yup.string().required("O nome é requerido."),
    privacy: yup.string().required("A privacidade é requerida.").default(Privacy.PUBLIC),
});