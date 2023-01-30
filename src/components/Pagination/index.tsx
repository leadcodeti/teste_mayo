import { useEffect, useState } from "react";
import { useSideBarContext } from "../../contexts/thirdContext";
import { PaginationItem } from "./PaginationItem";
import styles from "./styles.module.scss";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 6,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {


  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1100);
  }, []);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];
   
  if(loading){
    return(<></>)
  }

  return (
    <div className={styles.container}>
      {currentPage > 1 + siblingsCount && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > 2 + siblingsCount && (
            <span className={styles.paginationPrevItems}>...</span>
          )}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map((page) => {
          return (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          );
        })}

      <PaginationItem
        onPageChange={onPageChange}
        number={currentPage}
        isCurrent
      />

      {nextPages.length > 0 &&
        nextPages.map((page) => {
          return (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          );
        })}

      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && (
            <span className={styles.paginationNextItems}>...</span>
          )}
          <PaginationItem onPageChange={onPageChange} number={lastPage} />
        </>
      )}
    </div>
  );
}
