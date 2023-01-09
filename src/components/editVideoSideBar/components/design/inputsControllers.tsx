import { useFormContext } from "react-hook-form";
import styles from "./styles.module.scss";


interface InputControlerProps  {
   checked: boolean | undefined;
   handleClick: () => void;
   inputName:string;
   inputText:string;
}

export function InputsController({checked,handleClick,inputName,inputText}:InputControlerProps) {

  const { register } = useFormContext(); 

  return (
    <>
      <label className={styles.checkContainer}>
        <input
          id="botaoVolume"
          {...register(inputName)}
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
