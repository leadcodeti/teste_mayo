import { FiUpload, FiTrash } from "react-icons/fi";
import Image from "next/image";
import defaultProfileImage from "../../../public/images/avatarDefault.png";
import style from "./style.module.scss";
import { useState } from "react";
import { useVideoContext } from "../../contexts/useContext";
import { useForm } from "react-hook-form";
import { newUserDataProps } from "../../types/types";
import { ToastContainer, toast } from "react-toastify";

export default function MyAccount() {
  const { user, updateUser } = useVideoContext();
  const [avatarUser, setAvatarUser] = useState(defaultProfileImage);
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<newUserDataProps>();

  function submitUpdate(data: newUserDataProps) {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);

    const dataUser = {
      name: data.name,
      lastname: data.lastname,
      phone: data.phone,
      password: data.password,
      avatar: formData,
    };

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
              <div className={style.imageContainer}>
                <Image
                  src={user?.avatar ? user.avatar : defaultProfileImage}
                  alt="profile"
                  height={180}
                  width={200}
                  className={style.imageProfile}
                />
              </div>
              <div className={style.buttonsContainer}>
                <label htmlFor="uploadAvatar">
                  <FiUpload />
                  Upload
                </label>
                <input type="file" id="uploadAvatar" {...register("avatar")} />
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
      </div>
    </div>
  );
}
