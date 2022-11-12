import { useRef, useState } from "react";
import { useClickOutside } from "@react-hooks-library/core";
import { optionsLinks } from "../../utils/optionsLinks";
import styles from "./styles.module.scss";
import Link from "next/link";

interface OptionsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function OptionsMenu({ isOpen, setIsOpen }: OptionsProps) {
  const ref = useRef(null);
  

  useClickOutside(ref, () => {
    setIsOpen(!isOpen);
  });

  if (!isOpen) return null;

  return (
    <>
      {isOpen ? (
        <div className={styles.options} ref={ref}>
          {optionsLinks.map((link) => (
            <Link key={link.id} href={link.url} className={styles.links}>
              {link.name}
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
