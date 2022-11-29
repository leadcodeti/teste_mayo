import styles from "./styles.module.scss";
import { ButtonBelowVideo } from "./buttons";
import { useForm } from "react-hook-form";

interface ButtonTypes {
  text: string;
  color: string;
  background: string;
  link: string;
  size: string;
  hover: string;
}

export function BelowVideo() {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<ButtonTypes>();

  async function onSubmit(data: ButtonTypes) {
    if (data.text != "" && data.link != "") {
      let values = {
        text: data.text,
        color: data.color,
        background: data.background,
        hover: data.hover,
        link: data.link,
        size: data.size,
      };
      console.log(values);
      // localStorage.setItem("@buttonData", JSON.stringify(teste));
    }
  }

  // const buttonData = localStorage.getItem("@buttonData");
  // const newButtonData = buttonData;
  // console.log(newButtonData);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.propsButton}>
          <div>
            <label htmlFor="text">Texto</label>
            <input type="text" id="text" {...register("text")} />
          </div>
          <div>
            <label htmlFor="tamanho">Tamanho</label>
            <select id="tamanho" value={watch("size")} {...register("size")}>
              <option value={"250"}>Pequeno</option>
              <option value={"125"}>Médio</option>
              <option value={"150"}>Grande</option>
            </select>
          </div>
        </div>
        <div className={styles.linkButton}>
          <label htmlFor="link">Link</label>
          <input {...register("link")} type="text" id="link" />
        </div>
        <div className={styles.divisor} />
        <div className={styles.timerButton}>
          <div>
            <label htmlFor="start">Início</label>
            <input type="text" id="start" />
          </div>
          <div>
            <label htmlFor="end">Término</label>
            <input type="text" id="end" />
          </div>
        </div>
        <div className={styles.divisor} />
        <div className={styles.colorsButton}>
          <div>
            <label htmlFor="color">Cor do texto</label>
            <input
              value={watch("color") ? watch("color") : "#ffffff"}
              type="color"
              id="color"
              {...register("color")}
            />
          </div>
          <div>
            <label htmlFor="background">Background</label>
            <input
              value={watch("background") ? watch("background") : "#ff003c"}
              type="color"
              id="background"
              {...register("background")}
            />
          </div>
          <div>
            <label htmlFor="hover">Background hover</label>
            <input type="color" id="hover" {...register("hover")} />
          </div>
        </div>
        <div className={styles.divisor} />
        <div className={styles.previewButton}>
          <p>Pré-visualização</p>
          <div>
            <ButtonBelowVideo
              href={watch("link") ? watch("link") : "#"}
              target="_blank"
              background={watch("background")}
              hover={watch("hover")}
              color={watch("color")}
              sizeWidth={
                watch("size") === "100"
                  ? "100%"
                  : watch("size") === "125"
                  ? "125%"
                  : watch("size") === "150"
                  ? "150%"
                  : ""
              }
              sizeHeight={
                watch("size") === "100"
                  ? "40px"
                  : watch("size") === "125"
                  ? "50px"
                  : watch("size") === "150"
                  ? "55px"
                  : ""
              }
              sizeFont={
                watch("size") === "100"
                  ? "100%"
                  : watch("size") === "125"
                  ? "125%"
                  : watch("size") === "150"
                  ? "150%"
                  : ""
              }
            >
              {watch("text")}
            </ButtonBelowVideo>
          </div>
        </div>
        <div className={styles.divisor} />
        <div className={styles.saveOrCancel}>
          <button>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </>
  );
}
