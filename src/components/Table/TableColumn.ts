export default interface TableColumn {
    title: string,
    field: string,
    width?: number,
    message?: string,
    placement?: "left" | "center" | "right"
    render: (value: any, row: any) => React.ReactNode,
}