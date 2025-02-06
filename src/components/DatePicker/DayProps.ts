export default interface DayProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: number,
    selected?: boolean,
    currentDay?: boolean,
}