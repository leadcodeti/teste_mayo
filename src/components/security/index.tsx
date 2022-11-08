import { BiCheckShield, BiPlus } from "react-icons/bi";
import styles from "./styles.module.scss";

export function Security() {
  return (
    <div className={styles.container}>
      <h1>
        <BiCheckShield size={24} />
        Segurança
      </h1>
      <div className={styles.domains}>
        <h2>Domínios permitidos</h2>
        <p>Cadastre abaixo os domínios permitidos para executar o player.</p>
        <p>
          Se o player for inserido em algum domínio que não estiver listado
          abaixo, o mesmo não será executado.
        </p>
        <p>
          Para subdomínios como <span>exemplo.seudominio.com</span>, pode ser
          usado * para substituir o subdomínio. Ex:{" "}
          <span>*.seudominio.com</span>
        </p>

        <button className={styles.addNewDomain}>
          <BiPlus size={16} /> Adicionar domínio
        </button>
        <div className={styles.divisor}></div>
        <button className={styles.saveChanges}>Salvar alterações</button>
      </div>
    </div>
  );
}
