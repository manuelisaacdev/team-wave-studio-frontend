export default interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode,
    size?: "small" | "medium" | "large"
}