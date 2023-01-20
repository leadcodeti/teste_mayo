import { useEffect, useCallback,MouseEvent, useState, useRef, FormEvent, ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useVideoContext } from "../../../../contexts/useContext";
import { getThumbnails } from "../../../../pages/api/get_functions";
import { putThumbnails } from "../../../../pages/api/post_put_functions";
import { api } from "../../../../services/api";

interface thumbnailType {
  type: string | null,
  url: string | null,
}

export function InputsFunctions() {
  
  const { videosId } = useVideoContext();
  const [startImage, setStartImage] = useState<File | null>();
  const [pauseImage, setPauseImage] = useState<File | null>();
  const [finalImage, setfinalImage] = useState<File | null>();

  const [imageStartError, setImageStartError] = useState("");
  const [imagePauseError, setImagePauseError] = useState("");
  const [imageFinalError, setimageFinalError] = useState("");
  
  const [previewStartImage, setPreviewStartImage] = useState<string | null>(null);
  const [previewPauseImage, setPreviewPauseImage] = useState<string | null>(null);
  const [previewFinalImage, setPreviewFinalImage] = useState<string | null>(null);

  const queryClient = useQueryClient();
  
  const { data: thumbnails } = useQuery(["thumbnails", videosId.currentVideoId],
   () => getThumbnails(videosId.currentVideoId)
  );
  
  const { mutateAsync: thumbnailMutation } = useMutation(putThumbnails, {
    onSuccess: () => {
      queryClient.invalidateQueries("thumbnails");
    },
  });

  const imageStartRef = useRef<HTMLInputElement>(null);
  const imagePauseRef = useRef<HTMLInputElement>(null);
  const imageFinalRef = useRef<HTMLInputElement>(null);


  function handleClickOnStart(e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) {
    e.preventDefault();
    imageStartRef.current?.click()
  }


  useEffect(() => {
    thumbnails?.forEach((thumbnail: thumbnailType) => {
      if (thumbnail?.type === "start_image") {
        if(startImage === undefined){
          setPreviewStartImage(thumbnail.url);
        }
        
      } else if(thumbnail?.type === "pause_image"){
        if(pauseImage === undefined){
          setPreviewPauseImage(thumbnail.url);
        }
      } else {
        if(finalImage === undefined){
          setPreviewFinalImage(thumbnail.url);
        }
      }
    });
  },[finalImage, pauseImage, startImage, thumbnails])

    
  function handleClickOnPause(e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) {
    e.preventDefault();
    imagePauseRef.current?.click()
  }
    
  function handleClickOnFinal(e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) {
    e.preventDefault();
    imageFinalRef.current?.click()
  }

  async function onChangeStartImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files
    const formData = new FormData();

    if(file){
      const imageName = file[0];
      const validationImage = (/\.(jpg|jpeg|png|gif)$/);

      if(!imageName.name.match(validationImage)){
        setImageStartError('⚠ Arquivo inválido! Apenas imagem no formato jpg|jpeg|png|gif.')
        return;
      }

      if(file[0].size > 3000000 ){
        setImageStartError('⚠ Arquivo demasiado grande! Apenas imagens com tamanho de 3MB.')
        return;
      }
      
      formData.append("thumbnail", file[0]);
    
      await thumbnailMutation ({
        updata: {
          formData: formData,
          currentVideoId: videosId.currentVideoId,
          type: "start_image"
        }
      })


      toast.success("Imagem atualizada!")
      setStartImage(file[0]);
      setImageStartError("");
    } else {
      setStartImage(null);
    }
  }

  async function onChangePauseImage(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    const file = e.target.files

    if(file){
      const imageName = file[0];
      const validationImage = (/\.(jpg|jpeg|png|gif)$/);

      if(!imageName.name.match(validationImage)){
        setImagePauseError('⚠ Arquivo inválido! Apenas imagem no formato jpg|jpeg|png|gif.')
        return;
      }


      if(file[0].size > 3000000 ){
        setImagePauseError('⚠ Arquivo demasiado grande! Apenas imagens com tamanho de 3MB.')
        return;
      }

      formData.append("thumbnail", file[0]);

      await thumbnailMutation ({
        updata: {
          formData: formData,
          currentVideoId: videosId.currentVideoId,
          type: "pause_image"
        }
      })
    
      toast.success("Imagem atualizada!")
      setPauseImage(file[0]);
      setImagePauseError("");
    } else {
      setPauseImage(null);
    }
  }

  async function onChangeFinalImage(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    const file = e.target.files

    if(file){
      const imageName = file[0];
      const validationImage = (/\.(jpg|jpeg|png|gif)$/);

      if(!imageName.name.match(validationImage)){
        setimageFinalError('⚠ Arquivo inválido! Apenas imagem no formato jpg|jpeg|png|gif.')
        return;
      }


      if(file[0].size > 3000000 ){
       setimageFinalError('⚠ Arquivo demasiado grande! Apenas imagens com tamanho de 3MB.')
        return;
      }

      formData.append("thumbnail", file[0]);

      await thumbnailMutation ({
        updata: {
          formData: formData,
          currentVideoId: videosId.currentVideoId,
          type: "final_image"
        }
      })

      toast.success("Imagem atualizada!")
      setfinalImage(file[0]);
     setimageFinalError("");
    } else {
      setfinalImage(null);
    }
  }

  useEffect(() =>{
    if(startImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewStartImage(reader.result as string);
      }
      reader.readAsDataURL(startImage);
    } else {
      setPreviewStartImage(null);
    }

    if(pauseImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPauseImage(reader.result as string);
      }
      reader.readAsDataURL(pauseImage);
    } else {
      setPreviewPauseImage(null);
    }

    if(finalImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFinalImage(reader.result as string);
      }
      reader.readAsDataURL(finalImage);
    } else {
      setPreviewFinalImage(null);
    }

  },[finalImage, pauseImage, startImage])

  
  return {
  
     previewStartImage,
     previewPauseImage,
     previewFinalImage,

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
    }
}
