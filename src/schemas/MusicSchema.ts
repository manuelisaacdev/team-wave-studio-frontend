import * as yup from "yup";

export default yup.object({
    lyrics: yup.string(),
    description: yup.string(),
    title: yup.string().required("O título é requerido."),
    musicalGenreId: yup.string().required("O gênero musical é requerido."),
    releaseType: yup.string().required("O tipo de lançamento é requerido."),
    releaseDate: yup.string().required("A data de lançamento é requerida."),
});