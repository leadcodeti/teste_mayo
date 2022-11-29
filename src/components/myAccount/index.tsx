import { FiUpload, FiTrash } from "react-icons/fi";
import Image from "next/image";
import ImageProfile from "../../../public/images/thumbVideo.jpg";
import style from "./style.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../contexts/useContext";
import { useForm } from "react-hook-form";
import { newUserDataProps } from "../../types/types";
import { ToastContainer, toast } from "react-toastify";

export default function MyAccount() {
  const { user, updateUser } = useContext(AuthContext);
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<newUserDataProps>();

  function submitUpdate(data: newUserDataProps) {
    const dataUser = {
      name: data.name,
      lastname: data.lastname,
      phone: data.phone,
      password: data.password,
      avatar: data.avatar,
    };

    // if (data.password == "") {
    //   data.password = user?.password;
    // }

    updateUser(dataUser);
    console.log(dataUser);
    toast.success("Seus dados Foram atualizados!");
    reset();
  }

  return (
    <div className={style.wrapper}>
      <ToastContainer />
      <div className={style.container}>
        <h1>Meu Perfil</h1>
        <div className={style.userData}>
          <aside>
            <h1>Dados Gerais</h1>
            <span>Informações sobre a sua conta</span>
          </aside>

          <form
            onSubmit={handleSubmit(submitUpdate)}
            className={style.formContent}
          >
            <div className={style.imageContainer}>
              <strong>Foto de Perfil</strong>
              <Image
                src={ImageProfile}
                alt="profile"
                className={style.imageProfile}
              />

              <input type="file" {...register("avatar")} />
              <div className={style.buttonsContainer}>
                <button>
                  <FiUpload />
                  Upload
                </button>

                <button>
                  <FiTrash />
                  Remover
                </button>
              </div>
            </div>

            <div className={style.userInfo}>
              <br />

              <div className={style.userName}>
                <div className={style.inputContainer}>
                  <label htmlFor="name">Nome:</label>
                  <input
                    required
                    {...register("name")}
                    defaultValue={user?.name}
                    id="name"
                  />
                </div>
                <div className={style.spacing} />
                <div className={style.inputContainer}>
                  <label htmlFor="lastname">Sobrenome:</label>
                  <input
                    required
                    {...register("lastname")}
                    defaultValue={user?.lastname}
                    id="lastname"
                  />
                </div>
              </div>
              <div className={style.inputContainer}>
                <label>E-mail:</label>
                <input
                  style={{
                    background: "#ccc",
                    opacity: ".5",
                    cursor: "not-allowed",
                  }}
                  disabled
                  defaultValue={user?.email}
                  id="email"
                />
              </div>

              <div className={style.inputContainer}>
                <label htmlFor="phone">Telefone:</label>
                <input
                  placeholder="(00) 0 0000.0000"
                  {...register("phone")}
                  defaultValue={user?.phone}
                  id="phone"
                />
              </div>

              <div className={style.inputContainer}>
                <label htmlFor="password">Senha:</label>
                <input
                  placeholder="***"
                  {...register("password")}
                  id="password"
                  type="password"
                />
              </div>
            </div>

            <div className={style.formBtnContainer}>
              <button type="submit">Atualizar informações</button>
            </div>
          </form>
        </div>

        <div className={style.userPlan}>
          <aside>
            <h1>Seu Plano</h1>
            <span>Informações do seu plano e seu consumo de dados</span>
          </aside>

          <div className={style.plain}>
            <strong>Basic - R$ 197,00</strong>
            <p>Reiniciar em 13 dias</p>

            <label htmlFor="vol">145MB/4GB</label>
            <input
              type="range"
              id="vol"
              name="vol"
              min="0"
              max="100"
              className={style.inputRange}
            />

            <button>+ Detalhes do consumo</button>
          </div>
        </div>

        {/* <div className={style.userMethodPay}>
          <aside>
            <h1>Método de Pagamento</h1>
            <span>Informações do método de pagamento</span>
          </aside>

          <div className={style.plain}>
            <strong>Basic - R$ 197,00</strong>
            <p>Reiniciar em 13 dias</p>
            <input type="range" id="vol" name="vol" min="0" max="100" />

            <button>Cadastrar Cartão</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
