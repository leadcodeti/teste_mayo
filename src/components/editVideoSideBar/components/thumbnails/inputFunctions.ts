import { useEffect, MouseEvent, useState, useRef, ChangeEvent } from "react";
import { UseMutateAsyncFunction } from "react-query";
import { toast } from "react-toastify";
import { useSideBarContext } from "../../../../contexts/thirdContext";
import { useVideoContext } from "../../../../contexts/useContext";
import { ThumbsTypes } from "../../../../pages/api/post_put_functions";
import { ThumbnailsTypes } from "../../../../types/types";

interface thumbnailType {
  type: string | null;
  url: string | null;
}

interface InputsFunctionsProps {
  thumbnailMutation: UseMutateAsyncFunction<any, unknown, ThumbsTypes, unknown>;
  allThumbsnails: ThumbnailsTypes[] | undefined;
}

export function InputsFunctions({
  thumbnailMutation,
  allThumbsnails,
}: InputsFunctionsProps) {
  const { videosId } = useVideoContext();
  const { setThumbnailsProps, setThumbnailsImages, thumbnailsImages } = useSideBarContext();


  const [imageStartError, setImageStartError] = useState("");
  const [imagePauseError, setImagePauseError] = useState("");
  const [imageFinalError, setimageFinalError] = useState("");

  const [previewStartImage, setPreviewStartImage] = useState<string | null>(null);
  const [previewPauseImage, setPreviewPauseImage] = useState<string | null>(null);
  const [previewFinalImage, setPreviewFinalImage] = useState<string | null>(null);

  const imageStartRef = useRef<HTMLInputElement>(null);
  const imagePauseRef = useRef<HTMLInputElement>(null);
  const imageFinalRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const start_image = allThumbsnails?.find((thumbnail) => thumbnail.type === "start_image" );
    const pause_image = allThumbsnails?.find((thumbnail) => thumbnail.type === "pause_image" );
    const final_image = allThumbsnails?.find((thumbnail) => thumbnail.type === "final_image" );

    setThumbnailsProps({
      start_image: previewStartImage ? previewStartImage : start_image?.url,
      pause_image: previewPauseImage ? previewPauseImage: pause_image?.url,
      final_image: previewFinalImage ? previewFinalImage: final_image?.url,
    })

  },[allThumbsnails, previewFinalImage, previewPauseImage, previewStartImage, setThumbnailsProps])

  function handleClickOnStart(
    e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    imageStartRef.current?.click();
  }

  function handleClickOnPause(
    e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    imagePauseRef.current?.click();
  }

  function handleClickOnFinal(
    e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    imageFinalRef.current?.click();
  }

  async function onChangeStartImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;
    const formData = new FormData();

    if (file) {
      const imageName = file[0];
      const validationImage = /\.(jpg|jpeg|png|gif)$/;

      if (!imageName.name.match(validationImage)) {
        setImageStartError(
          "⚠ Arquivo inválido! Apenas imagem no formato jpg|jpeg|png|gif."
        );
        return;
      }

      if (file[0].size > 3000000) {
        setImageStartError(
          "⚠ Arquivo demasiado grande! Apenas imagens com tamanho de 3MB."
        );
        return;
      }

      formData.append("thumbnail", file[0]);

      await thumbnailMutation({
        updata: {
          formData: formData,
          currentVideoId: videosId.currentVideoId,
          type: "start_image",
        },
      });

      toast.success("Imagem atualizada!");
      setThumbnailsImages({
        startImage: file[0],
      });

      setImageStartError("");
    } else {
      setThumbnailsImages({
        startImage: null,
      });
    }
  }

  async function onChangePauseImage(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    const file = e.target.files;

    if (file) {
      const imageName = file[0];
      const validationImage = /\.(jpg|jpeg|png|gif)$/;

      if (!imageName.name.match(validationImage)) {
        setImagePauseError(
          "⚠ Arquivo inválido! Apenas imagem no formato jpg|jpeg|png|gif."
        );
        return;
      }

      if (file[0].size > 3000000) {
        setImagePauseError(
          "⚠ Arquivo demasiado grande! Apenas imagens com tamanho de 3MB."
        );
        return;
      }

      formData.append("thumbnail", file[0]);

      await thumbnailMutation({
        updata: {
          formData: formData,
          currentVideoId: videosId.currentVideoId,
          type: "pause_image",
        },
      });

      toast.success("Imagem atualizada!");
      setThumbnailsImages({
        pauseImage: file[0],
      });
      setImagePauseError("");
    } else {
      setThumbnailsImages({
        pauseImage: null,
      });
    }
  }

  async function onChangeFinalImage(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    const file = e.target.files;

    if (file) {
      const imageName = file[0];
      const validationImage = /\.(jpg|jpeg|png|gif)$/;

      if (!imageName.name.match(validationImage)) {
        setimageFinalError(
          "⚠ Arquivo inválido! Apenas imagem no formato jpg|jpeg|png|gif."
        );
        return;
      }

      if (file[0].size > 3000000) {
        setimageFinalError(
          "⚠ Arquivo demasiado grande! Apenas imagens com tamanho de 3MB."
        );
        return;
      }

      formData.append("thumbnail", file[0]);

      await thumbnailMutation({
        updata: {
          formData: formData,
          currentVideoId: videosId.currentVideoId,
          type: "final_image",
        },
      });

      toast.success("Imagem atualizada!");
      setThumbnailsImages({
        finalImage: file[0],
      });
      setimageFinalError("");
    } else {
      setThumbnailsImages({
        finalImage: null,
      });
    }
  }

  useEffect(() => {

    if (thumbnailsImages.startImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewStartImage(reader.result as string);
      };
      reader.readAsDataURL(thumbnailsImages.startImage);
    } else {
      setPreviewStartImage(null);
    }

    if (thumbnailsImages.pauseImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPauseImage(reader.result as string);
      };
      reader.readAsDataURL(thumbnailsImages.pauseImage);
    } else {
      setPreviewPauseImage(null);
    }

    if (thumbnailsImages.finalImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFinalImage(reader.result as string);
      };
      reader.readAsDataURL(thumbnailsImages.finalImage);
    } else {
      setPreviewFinalImage(null);
    }
   
  }, [thumbnailsImages]);

  return {

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
  };
}
