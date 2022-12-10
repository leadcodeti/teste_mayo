import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useVideoContext } from "../../../../contexts/useContext";
import { api } from "../../../../services/api";

interface containerContinuarProps {
  background_color: string;
  message: string;
  continue_button_text: string;
  restart_button_text: string;
  text_color: string;
}

export function WatchAgain() {
  const { register, handleSubmit, watch, reset } =
    useForm<containerContinuarProps>();
  const { continuarProps, setContinuarProps, currentVideo } = useVideoContext();

  async function submitContinuar({
    message,
    continue_button_text,
    restart_button_text,
    text_color,
    background_color,
  }: containerContinuarProps) {
    await api.put(`/resume_video_options/${currentVideo.currentVideoId}`, {
      message,
      continue_button_text,
      restart_button_text,
      text_color,
      background_color,
    });
    // .then((res) => {
    //   console.log(res.data);
    // });

    await api(`/resume_video_options/${currentVideo.currentVideoId}`).then(
      (res) => {
        setContinuarProps({
          message: res.data.message,
          continue_button_text: res.data.continue_button_text,
          restart_button_text: res.data.restart_button_text,
          text_color: res.data.text_color,
          background_color: res.data.background_color,
        });
      }
    );
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submitContinuar)}
      className={styles.watchAgain}
    >
      <div className={styles.textStyles}>
        <p>Mensagem</p>
        <input {...register("message")} type="text" />
        <hr />

        <p>Botão continuar</p>
        <input {...register("continue_button_text")} type="text" />

        <hr />

        <p>Botão Recomeçar</p>
        <input {...register("restart_button_text")} type="text" />
        <hr />
      </div>

      <span>
        <label htmlFor="corDoTexto">Cor do Texto</label>{" "}
        <input
          className={styles.colors}
          type="color"
          id="corDoTexto"
          {...register("text_color")}
          value={watch("text_color") ? watch("text_color") : "#ffffff"}
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
          value={
            watch("background_color") ? watch("background_color") : "#ff003c"
          }
        />
      </span>
      <div className={styles.saveOrCancel}>
        <span>Cancelar</span>
        <button type="submit">Salvar</button>
      </div>
    </form>
  );
}
