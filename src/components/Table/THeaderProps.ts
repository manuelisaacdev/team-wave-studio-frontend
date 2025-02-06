import TableColumn from "./TableColumn";

export default interface THeaderProps extends React.HTMLAttributes<HTMLElement> {
    tableColumn: TableColumn,
}