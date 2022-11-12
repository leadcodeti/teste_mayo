import {
  AiOutlineExclamationCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import styles from "./styles.module.scss";

export function FakeBar() {
  return (
    <div className={styles.fakeBar}>
      <p className={styles.whatsFakeBar}>
        <AiOutlineExclamationCircle /> O que é fakeBar
      </p>
      <div className={styles.fakeBarRange}>
        <label htmlFor="">Altura</label>
        <input type="range" />
        <p>
          Variaveis de teste <AiOutlineExclamationCircle />
        </p>
        <span>
          <input type="checkbox" />{" "}
          <label htmlFor="">
            Altura <AiOutlineQuestionCircle />
          </label>
        </span>
        <span>
          <input type="checkbox" />{" "}
          <label htmlFor="">
            Término <AiOutlineQuestionCircle />
          </label>
        </span>
      </div>
      <div className={styles.saveOrCancel}>
        <button>Cancelar</button>
        <button>Salvar</button>
      </div>
    </div>
  );
}
