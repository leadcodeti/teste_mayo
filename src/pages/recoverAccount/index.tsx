import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi"
import { CiLock } from "react-icons/ci"
import Logo from "../../../public/images/logo-1.svg"
import styles from "./styles.module.scss";

export default function RecoverAccount() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
         <form className={styles.formContainer}>
            <Image src={Logo}  alt="Logo"/>

            <strong>Esqueci a senha</strong>
            <span>Leia as instruções</span>

            <p className={styles.description}>
              Esqueceu sua senha? Digite seu endreço de e-email no formulário
              abaixo para redefinir sua senha.
            </p>
            
            <label htmlFor="email">E-mail<span className={styles.required}>*</span></label>
            <div className={styles.inputBox}>
              <HiOutlineMail />
              <input type="email" name="email" id="email" placeholder="e-mail" />
            </div>

            <button type="submit">Enviar</button>

            <div className={styles.formFooter}>
              <p>
                <CiLock />
                Site 100% seguro
              </p>
              
              <Link href="/login" className={styles.backLink}>Voltar para o login</Link>
            </div>
         </form>
      </div>
    </section>
  );
}
