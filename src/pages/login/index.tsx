import Link from "next/link";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../contexts/useContext";

interface LoginTypes {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<LoginTypes>({
      defaultValues: { email: "jibas1997@hotmail.com", password: "123" },
    });

  const { signIn } = useContext(AuthContext);

  async function submitLogin(data: LoginTypes) {
    const valuesLogin = {
      email: data.email,
      password: data.password,
    };

    await signIn(valuesLogin);
  }

  return (
    <div className={styles.backgroundLogin}>
      <div className={styles.containerLogin}>
        <form onSubmit={handleSubmit(submitLogin)} className={styles.formLogin}>
          <img src="/images/logo-1.svg" alt="Logo MayoPlayer" />
          <p>Acessar minha conta</p>
          <input {...register("email")} type="text" placeholder="E-mail" />
          <input {...register("password")} type="text" placeholder="Senha" />
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
