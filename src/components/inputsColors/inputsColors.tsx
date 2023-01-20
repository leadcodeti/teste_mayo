import { Dispatch, RefObject, SetStateAction, useState } from "react";
import styles from "./styles.module.scss";

interface InputsProps {
  backgroundColor: string | undefined; //Vem do BACKEND
  backgroundStates: Dispatch<SetStateAction<string>>
  backgroundHandleClick:() => void;
  inputRef: RefObject<HTMLInputElement>
  inputTextName: string | undefined
}

export function InputColors (
  { backgroundColor,backgroundHandleClick
   ,backgroundStates,inputRef,inputTextName
  }: InputsProps) {


  return (
    <>
      <div className={styles.inputColorContainer}>
        <label>{inputTextName}</label>
        <label
          className={styles.inputColor}
          style={{ background: `${backgroundColor}` }}
          onClick={backgroundHandleClick}
        ></label>

        <div className={styles.inputDisabled}>
          <input
            className={styles.colors}
            type="color"
            ref={inputRef}
            value={backgroundColor}
            onChange={(e) => backgroundStates(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
