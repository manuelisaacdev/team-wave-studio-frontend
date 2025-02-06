export const variants: AlertVariant = {
    info: "text-blue-400 bg-blue-400/10 border-blue-400/25",
    success: "text-green-400 bg-green-400/10 border-green-400/25",
    warning: "text-orange-400 bg-orange-400/10 border-orange-400/25",
    error: "text-red-400 bg-red-400/10 border-red-400/25",
};

export const solidVariants: AlertVariant = {
    info: "bg-blue-950",
    success: "bg-green-950",
    warning: "bg-orange-950",
    error: "bg-red-950",
}

export default interface AlertVariant {
    info: string,
    success: string,
    warning: string,
    error: string,
}
