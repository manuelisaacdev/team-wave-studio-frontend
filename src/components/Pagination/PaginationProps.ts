import StackProps from "../Stack/StackProps";

export default interface PaginationProps extends StackProps {
    showMax?: number,
    totalPages?: number;
    currentPage?: number,
    onPageChange: (page: number) => void,
}