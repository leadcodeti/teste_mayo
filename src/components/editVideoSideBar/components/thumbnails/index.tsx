
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { InputThumbnail } from "./inputThumbnail";
import { InputsFunctions } from "./inputFunctions";
import { useMutation, useQueryClient } from "react-query";
import { putThumbnails } from "../../../../pages/api/post_put_functions";
import { useSideBarContext } from "../../../../contexts/thirdContext";
import styles from "./styles.module.scss";
import { useVideoContext } from "../../../../contexts/useContext";

export function Thumbnails() {

  const queryClient = useQueryClient();
  const { allThumbsnails, thumbnailsProps  } = useSideBarContext()
  
  const { videosId, setThumbnailsProps, user } = useVideoContext();
  
   const { mutateAsync: thumbnailMutation } = useMutation(putThumbnails, {
     onSuccess: () => {
       queryClient.invalidateQueries("thumbnails");
     },
   });




  const {

    handleClickOnFinal,
    handleClickOnStart,
    handleClickOnPause,

    onChangeStartImage,
    onChangePauseImage,
    onChangeFinalImage,

    imageStartRef,
    imagePauseRef,
    imageFinalRef,

    imageStartError,
    imagePauseError,
    imageFinalError,
   }= InputsFunctions({thumbnailMutation, allThumbsnails})


  return (
    <>
      <form className={styles.thumbnails}>
        <p className={styles.whatsThumbnails}>
          <AiOutlineExclamationCircle /> O que são Thumbnails
        </p>
         <InputThumbnail 
          inputImage={thumbnailsProps?.start_image} 
          inputTitle="Thumbnail de início" 
          inputName="start_image" 
          handleChange={onChangeStartImage}
          handleClick={handleClickOnStart}
          imageRef={imageStartRef}
          imageError={imageStartError}
        />

        <InputThumbnail 
          inputImage={thumbnailsProps?.pause_image} 
          inputTitle="Thumbnail de pause" 
          inputName="pause_image" 
          handleChange={onChangePauseImage}
          handleClick={handleClickOnPause}
          imageRef={imagePauseRef}
          imageError={imagePauseError}
        />

        <InputThumbnail 
          inputImage={thumbnailsProps?.final_image} 
          inputTitle="Thumbnail no final" 
          inputName="final_image" 
          handleChange={onChangeFinalImage}
          handleClick={handleClickOnFinal}
          imageRef={imageFinalRef}
          imageError={imageFinalError}
        />
      </form>
    </>
  );
}
