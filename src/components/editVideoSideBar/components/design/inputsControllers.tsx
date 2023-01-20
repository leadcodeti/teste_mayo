
import styles from "./styles.module.scss";

interface InputControlerProps  {
   checked: boolean | undefined;
   handleClick: () => void;
   inputText:string;
}

export function InputsController({checked,handleClick,inputText}:InputControlerProps) {

  return (
    <>
      <label className={styles.checkContainer}>
        <input
          id="botaoVolume"
          checked={checked}
          type="checkbox"
          onClick={handleClick}
        />
        <span className={styles.checkmark}></span>
        <p>{inputText}</p>
      </label>
    </>
  );
}
