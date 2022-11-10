import { FiUpload, FiTrash } from "react-icons/fi";
import Image from "next/image";
import ImageProfile from "../../../public/images/thumbVideo.jpg";
import { Inputs } from "../inputs/inputs";
import style from "./style.module.scss";

export default function MyAccount() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Meu Perfil</h1>
        <div className={style.userData}>
          <aside>
            <h1>Dados Gerais</h1>
            <span>Informações sobre a sua conta</span>
          </aside>

          <form className={style.formContent}>
            <div className={style.imageContainer}>
              <strong>Foto de Perfil</strong>
              <Image
                src={ImageProfile}
                alt="profile"
                className={style.imageProfile}
              />

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
              <div className={style.userName}>
                <Inputs
                  name="Nome"
                  placeholder="Nome"
                  type="text"
                  requiredInput="*"
                />
                <div className={style.spacing} />
                <Inputs
                  name="Sobrenome"
                  placeholder="Sobrenome"
                  type="text"
                  requiredInput="*"
                />
              </div>
              <Inputs
                name="E-mail"
                placeholder="E-mail"
                type="email"
                requiredInput="*"
              />
              <Inputs
                name="Telefone"
                placeholder="(00) 0 0000.0000"
                type="text"
                requiredInput=""
              />
              <Inputs
                name="Atualizar senha"
                placeholder="Atualizar senha"
                type="text"
                requiredInput=""
              />
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

        <div className={style.userMethodPay}>
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
        </div>
      </div>
    </div>
  );
}
