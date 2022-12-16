import { useForm } from "react-hook-form";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useVideoContext } from "../../../../contexts/useContext";
import { useCallback, useEffect } from "react";
import styles from "./styles.module.scss";
import { api } from "../../../../services/api";

interface containerAutoPlayProps {
  background_color: string;
  text_color: string;
  top_text: string;
  bottom_text: string;
}

export function AutoPlay() {
  const { register, handleSubmit, watch, reset } =
    useForm<containerAutoPlayProps>();
  const { autoPLayProps, setAutoPlayProps, videosId, user } = useVideoContext();

  const getContinuosProps = useCallback(async () => {
    if (user) {
      await api(`/autoplays/${videosId.currentVideoId}`).then((res) => {
        setAutoPlayProps({
          text_color: res.data.text_color,
          background_color: res.data.background_color,
          top_text: res.data.top_text,
          bottom_text: res.data.bottom_text,
        });
      });
    }
  }, [setAutoPlayProps, user, videosId.currentVideoId]);

  useEffect(() => {
    getContinuosProps();
  }, [getContinuosProps, setAutoPlayProps, videosId.currentVideoId]);

  async function submitAutoPlay({
    background_color,
    text_color,
    top_text,
    bottom_text,
  }: containerAutoPlayProps) {
    await api.put(`/autoplays/${videosId.currentVideoId}`, {
      background_color,
      text_color,
      top_text,
      bottom_text,
    });
    getContinuosProps();
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submitAutoPlay)} className={styles.autoPLay}>
      <p className={styles.whatsAutoPlay}>
        <AiOutlineExclamationCircle /> O que é AutoPlay
      </p>
      <span>
        <label htmlFor="corDoTexto">Cor do Texto</label>{" "}
        <input
          className={styles.colors}
          type="color"
          id="corDoTexto"
          {...register("text_color")}
          // defaultValue={
          //   autoPLayProps.text_color ? autoPLayProps.text_color : "#ffffff"
          // }
        />
      </span>
      <br />
      <span>
        <label htmlFor="corDobackground">Cor do background</label>{" "}
        <input
          className={styles.colors}
          type="color"
          id="corDobackground"
          {...register("background_color")}
          // defaultValue={
          //   autoPLayProps.background_color
          //     ? autoPLayProps.background_color
          //     : "#ff003c"
          // }
        />
      </span>

      <hr />
      <div className={styles.textStyles}>
        <p>Texto Superior</p>
        <input
          type="text"
          {...register("top_text")}
          // defaultValue={autoPLayProps.top_text ? autoPLayProps.top_text : ""}
        />
        <hr />

        <p>Texto Inferior</p>
        <input
          type="text"
          {...register("bottom_text")}
          // defaultValue={
          //   autoPLayProps.bottom_text ? autoPLayProps.bottom_text : ""
          // }
        />
      </div>
      <div className={styles.saveOrCancel}>
        <button>Cancelar</button>
        <button>Salvar</button>
      </div>
    </form>
  );
}
