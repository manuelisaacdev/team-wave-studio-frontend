import TableColumn from "./TableColumn";

export default interface TableProps {
    data?: any[],
    loading?: boolean,
    checkedAll?: boolean,
    showSelection?: boolean,
    columns?: TableColumn[],
    height?: number | string,
    inputCheck?: (boolean: boolean) => void,
}