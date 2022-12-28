import styles from "./styles.module.scss";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  {
    if (isCurrent) {
      return <div style={{ background: "#ff003c" }}>{number}</div>;
    }
  }

  return <div onClick={() => onPageChange(number)}>{number}</div>;
}
