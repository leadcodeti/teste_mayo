import { useSideBarContext } from "../../contexts/thirdContext";
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

  const { isLoading } = useSideBarContext();
  {
    if (isCurrent) {
      return isLoading ? <p></p> : <div style={{ background: "#ff003c" }}>{number}</div>;
    }
  }

  return isLoading ? <p></p>: <div onClick={() => onPageChange(number)}>{number}</div>;
}
