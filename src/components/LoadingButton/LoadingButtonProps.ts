import ButtonProps from "../Button/ButtonProps";

export default interface LoadingButtonProps  extends Exclude<ButtonProps, "startIcon" | "endIcon"> {
    loading?: boolean,
    icon?: {
        size?: number,
        color?: string,
    }
}