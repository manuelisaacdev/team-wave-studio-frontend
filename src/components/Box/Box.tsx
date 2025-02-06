import BoxProps from './BoxProps'

export default function Box({children, component:Component="div", ...rest}:BoxProps) {
    return (
        <Component {...rest}>{children}</Component>
    )
}
