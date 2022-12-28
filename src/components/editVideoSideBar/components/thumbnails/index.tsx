import styles from "./styles.module.scss";
import { AiOutlineFileImage, AiOutlineExclamationCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useVideoContext } from "../../../../contexts/useContext";
import { ThumbnailsProps } from "../../../../types/types";
import { useEffect, useCallback } from "react";

export function Thumbnails() {
  const { register, handleSubmit, reset } = useForm<ThumbnailsProps>();
  const { videosId, thumbnailsProps, setThumbnailsProps, user } =
    useVideoContext();

  useEffect(() => {
    thumbnailsProps;
    setThumbnailsProps;
  }, [thumbnailsProps, setThumbnailsProps]);

  const getContinuosProps = useCallback(async () => {
    if (user) {
      await api(`/thumbnails/${videosId.currentVideoId}`).then((res) => {
        console.log("teste thumbnails sem props", res.data[0].url);
        const startImageFiltered = res.data.filter(
          (e: { type: string }) => e.type === "start_image"
        );
        const pauseImageFiltered = res.data.filter(
          (e: { type: string }) => e.type === "pause_image"
        );
        const finalImageFiltered = res.data.filter(
          (e: { type: string }) => e.type === "final_image"
        );
        setThumbnailsProps({
          start_image: startImageFiltered[0].url,
          pause_image: pauseImageFiltered[0].url,
          final_image: finalImageFiltered[0].url,
        });
      });
    }
  }, [setThumbnailsProps, user, videosId.currentVideoId]);

  useEffect(() => {
    getContinuosProps();
  }, [getContinuosProps, setThumbnailsProps, videosId.currentVideoId]);

  async function submitStartThumbnails(data: ThumbnailsProps) {
    const formData = new FormData();

    formData.append("thumbnail", data.start_image[0]);

    const headers = { "Content-Type": "multipart/form-data" };

    await api.put(
      `/thumbnails/${videosId.currentVideoId}?type=${"start_image"}`,
      formData,
      {
        headers: headers,
      }
    );

    getContinuosProps();
    reset();
  }

  async function submitPauseThumbnails(data: ThumbnailsProps) {
    const formData = new FormData();

    formData.append("thumbnail", data.pause_image[0]);

    const headers = { "Content-Type": "multipart/form-data" };

    await api
      .put(
        `/thumbnails/${videosId.currentVideoId}?type=${"pause_image"}`,
        formData,
        {
          headers: headers,
        }
      )
      .then((res) => console.log(res.data));

    getContinuosProps();
    reset();
  }

  async function submitFinalThumbnails(data: ThumbnailsProps) {
    const formData = new FormData();

    formData.append("thumbnail", data.final_image[0]);

    const headers = { "Content-Type": "multipart/form-data" };

    await api.put(
      `/thumbnails/${videosId.currentVideoId}?type=${"final_image"}`,
      formData,
      {
        headers: headers,
      }
    );

    getContinuosProps();
    reset();
  }

  async function submitThumbnails(data: ThumbnailsProps) {
    const formData = new FormData();
    let thumbnailType;

    if (data.start_image.length > 0) {
      formData.append("thumbnail", data.start_image[0]);
      thumbnailType = "start_image";
    } else if (data.pause_image.length > 0) {
      formData.append("thumbnail", data.pause_image[0]);
      thumbnailType = "pause_image";
    } else if (data.final_image.length > 0) {
      formData.append("thumbnail", data.final_image[0]);
      thumbnailType = "final_image";
    }

    const headers = { "Content-Type": "multipart/form-data" };

    await api.put(
      `/thumbnails/${videosId.currentVideoId}?type=${thumbnailType}`,
      formData,
      {
        headers: headers,
      }
    );

    getContinuosProps();
    reset();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(submitThumbnails)}
        className={styles.thumbnails}
      >
        <p className={styles.whatsThumbnails}>
          <AiOutlineExclamationCircle /> O que são Thumbnails
        </p>
        <div className={styles.start_image}>
          <p>Thumbnail de início</p>
          <label className={styles.thumbnailsBox} htmlFor="start_image">
            <AiOutlineFileImage />
            Upload de imagem
            <p>Clique ou arraste uma imagem</p>
          </label>
          <input
            {...register("start_image")}
            id="start_image"
            type="file"
            // onChange={handleSubmit(submitStartThumbnails)}
          />
          <hr />
        </div>
        <div className={styles.pause_image}>
          <p>Thumbnail de Pause</p>
          <label className={styles.thumbnailsBox} htmlFor="pause_image">
            <AiOutlineFileImage />
            Upload de imagem
            <p>Clique ou arraste uma imagem</p>
          </label>
          <input {...register("pause_image")} id="pause_image" type="file" />
          <hr />
        </div>
        <div className={styles.final_image}>
          <p>Thumbnail de Final</p>
          <label className={styles.thumbnailsBox} htmlFor="final_image">
            <AiOutlineFileImage />
            Upload de imagem
            <p>Clique ou arraste uma imagem</p>
          </label>
          <input
            {...register("final_image")}
            id="final_image"
            type="file"
            // onChange={handleSubmit(submitFinalThumbnails)}
          />
        </div>
        <div className={styles.saveOrCancel}>
          <button>Cancelar</button>
          <button>Salvar</button>
        </div>
      </form>
    </>
  );
}
