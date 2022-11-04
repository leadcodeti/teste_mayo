import Link from "next/link";
import styles from "./styles.module.scss";

export default function Login() {
  return (
    <div className={styles.backgroundLogin}>
      <div className={styles.containerLogin}>
        <form className={styles.formLogin}>
          <img src="/images/logo-1.svg" alt="Logo MayoPlayer" />
          <p>Acessar minha conta</p>
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Senha" />
          <button type="submit">Acessar</button>
          <Link href="/recoverAccount" className={styles.forgotKey}>
            Esqueci minha senha
          </Link>
        </form>
        <div className={styles.knowPlans}>
          <p className={styles.haveNoAccountYet}>Não tem conta ainda?</p>
          <p>Conheça nossos planos</p>
          <Link href="plans">Conhecer planos</Link>
        </div>
      </div>
    </div>
  );
}
