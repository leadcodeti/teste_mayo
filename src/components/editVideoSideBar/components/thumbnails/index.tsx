import styles from "./styles.module.scss";
import { AiOutlineFileImage, AiOutlineExclamationCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useVideoContext } from "../../../../contexts/useContext";
import { ThumbnailsProps } from "../../../../types/types";
import { useEffect } from "react";

export function Thumbnails() {
  const { register, handleSubmit, reset, watch } = useForm<ThumbnailsProps>();
  const { updateThumbnails, videosId, setThumbnails } = useVideoContext();

  async function submitThumbnails(data: ThumbnailsProps) {
    const formData = new FormData();

    if (data.thumbnail.start_image) {
      formData.append("thumbnail", data.thumbnail.start_image[0]);
    } else if (data.thumbnail.pause_image) {
      formData.append("thumbnail", data.thumbnail.pause_image[0]);
    } else {
      formData.append("thumbnail", data.thumbnail.final_image[0]);
    }

    const headers = { "Content-Type": "multipart/form-data" };

    await api.put(
      `/thumbnails/${videosId.currentVideoId}?type=start_image`,
      formData,
      {
        headers: headers,
      }
    );

    console.log("teste", data.thumbnail);

    // const dataThumbnails = {
    //   thumbnail: formData,
    // };

    // console.log(dataThumbnails);
    // updateThumbnails(dataThumbnails);

    // reset();
  }

  useEffect(() => {
    api(`/thumbnails/${videosId.currentVideoId}`).then((res) => {
      setThumbnails(res.data);
      console.log("thumbnails res", res.data);
    });
  }, [videosId.currentVideoId, setThumbnails]);

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
            {...register("thumbnail.start_image")}
            id="start_image"
            type="file"
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
          <input
            {...register("thumbnail.pause_image")}
            id="pause_image"
            type="file"
          />
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
            {...register("thumbnail.final_image")}
            id="final_image"
            type="file"
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
