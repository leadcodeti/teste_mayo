import styles from "./styles.module.scss";
import { ButtonBelowVideo } from "./buttons";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useVideoContext } from "../../../../contexts/useContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
  link?: string;
}

export function BelowVideo() {
  const { register, handleSubmit, watch } = useForm<ButtonUpdateProps>();
  const {
    buttonOption,
    currentVideo,
    closeModalNewButton,
    setBelowButtonProps,
  } = useVideoContext();

  useEffect(() => {
    currentVideo.currentVideoId;
  }, [currentVideo.currentVideoId]);

  async function updateButton({
    text,
    size,
    background,
    background_hover,
    position,
    start,
    end,
    text_color,
    link,
  }: ButtonUpdateProps) {
    await api.put(
      `/cta_buttons/${currentVideo.currentVideoId}?type=${buttonOption}`,
      {
        text,
        size,
        background,
        background_hover,
        position,
        start,
        end,
        text_color,
        link,
        video_id: currentVideo.currentVideoId,
      }
    );

    await api(
      `/cta_buttons/${currentVideo.currentVideoId}?type=${buttonOption}`
    ).then((res) => {
      const data = res.data;
      const belowFiltered = data.filter((e: any) => e.type === "below");
      const belowResult = belowFiltered[0];
      setBelowButtonProps({
        background_color: belowResult.background_color,
        bacgrkound_hover: belowResult.background_hover,
        size: belowResult.size,
        text: belowResult.text,
        text_color: belowResult.text_color,
        link: belowResult.link,
        is_visible: belowResult.is_visible,
      });
    });

    closeModalNewButton();
    toast.success("Botão salvo");
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
              <option value={"125"}>Pequeno</option>
              <option value={"150"}>Médio</option>
              <option value={"250"}>Grande</option>
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
                watch("size") === "125"
                  ? "180px"
                  : watch("size") === "150"
                  ? "250px"
                  : watch("size") === "250"
                  ? "350px"
                  : ""
              }
              sizeFont={
                watch("size") === "125"
                  ? "100%"
                  : watch("size") === "150"
                  ? "150%"
                  : watch("size") === "250"
                  ? "200%"
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
