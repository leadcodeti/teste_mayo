
import { InputsProps } from "../../types/types"
import style from "./style.module.scss"

export function Inputs({name, type, placeholder, requiredInput}: InputsProps) {

  return(
    <div className={style.inputContainer}>
      <label htmlFor={name}><span>{requiredInput}</span>{name}:</label><br/>
      <input id={name} name={name} type={type} placeholder={placeholder} />
    </div>
  )
}