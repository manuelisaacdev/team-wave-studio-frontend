import TableColumn from "./TableColumn";

export default interface TRowProps extends React.HTMLAttributes<HTMLElement> {
    columns: TableColumn[],
    showSelection?: boolean,
    row: any, 
    rowIndex: number,
}