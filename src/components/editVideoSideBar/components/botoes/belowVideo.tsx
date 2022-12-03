import styles from "./styles.module.scss";
import { ButtonBelowVideo } from "./buttons";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";

interface ButtonUpdateProps {
  text: string;
  size?: string;
  background: string;
  background_hover: string;
  position?: string;
  video_id: string;
  start?: string;
  end?: string;
  text_color?: string;
}

export function BelowVideo() {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<ButtonUpdateProps>();

  async function updateButton({
    text,
    size,
    background,
    background_hover,
    position,
    video_id,
    start,
    end,
    text_color,
  }: ButtonUpdateProps) {
    api
      .put(`/cta_buttons/e9546851-7281-4d1a-9a45-87ef48e2b45c?type=below`, {
        text,
        size,
        background,
        background_hover,
        position,
        start,
        end,
        text_color,
        video_id: "e9546851-7281-4d1a-9a45-87ef48e2b45c",
      })
      .then((res) => console.log(res.data));
  }

  return (
    <>
      <form onSubmit={handleSubmit(updateButton)}>
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
        {/* <div className={styles.linkButton}>
          <label htmlFor="link">Link</label>
          <input {...register("link")} type="text" id="link" />
        </div> */}
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
              value={watch("text_color") ? watch("text_color") : "#ffffff"}
              type="color"
              id="color"
              {...register("text_color")}
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
            <input type="color" id="hover" {...register("background_hover")} />
          </div>
        </div>
        <div className={styles.divisor} />
        <div className={styles.previewButton}>
          <p>Pré-visualização</p>
          <div>
            <ButtonBelowVideo
              href={"#"}
              target="_blank"
              background={watch("background")}
              background_hover={watch("background_hover")}
              text_color={watch("text_color")}
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
