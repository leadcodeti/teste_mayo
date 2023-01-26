import { api } from "../../services/api"
import { BackgroundProps, ControllerProps, CreateVideoTypes, PutAutoplayTypes, PutContinueTypes, PutSwicthTypes } from "../../types/types";

export interface PutDesignTypes {
  currentVideoId:string;
  newDesignData: {
    background_color: string | undefined;
  }
}

export interface PutControllersTypes {
  currentVideoId:string;
  newControlersData: ControllerProps
}

export interface VideoNameTypes {
  videosId :{
    videoName:string
    currentVideoId:string,
  }
}

export interface ThumbsTypes {
  updata :{
    formData?: FormData,
    currentVideoId:string,
    type:string;
  }
}


export const putDesign = async ({newDesignData,currentVideoId}:PutDesignTypes) => {
  
  if(currentVideoId){
    const { data } = await api.put<BackgroundProps>(`/designs/${currentVideoId}`,newDesignData)
    return data;
  } else {
    return ;
  }

}

export const putControllers = async ({currentVideoId, newControlersData}:PutControllersTypes):Promise<PutControllersTypes | undefined> => {
  
  if(currentVideoId){
    const { data } = await api.put(`/controls/${currentVideoId}`, newControlersData);
    return data
  } else {
    return ;
  }

}

export const createVideo = async ({ name, url}:CreateVideoTypes):Promise<CreateVideoTypes | undefined> => {
    if(name && url){
      const { data } = await api.post(`/videos`,{name,url});
      return data;
    }
    return ;
}

export const deleteVideo = async (currentVideoId:string):Promise<string | undefined> => {
  if(currentVideoId){
    const { data } = await api.delete(`/videos/${currentVideoId}`);
    return data;
  }
  return ;
}

export const upDateVideoName = async ({videosId}:VideoNameTypes):Promise<VideoNameTypes | undefined> => {
  if(videosId){
    const { data } = await api.put(`/videos/${videosId.currentVideoId}`, {
      name:videosId.videoName
     });
     
    return data;
  }
  return ;
}

export const putThumbnails = async ({ updata }: ThumbsTypes) => {

  const headers = { "Content-Type": "multipart/form-data" };

  if(updata.currentVideoId){
    const { data } = await api.put(
      `/thumbnails/${updata.currentVideoId}?type=${updata.type}`,
       updata.formData,
      {
        headers: headers,
      }
   );
    return data;
  } else {
    return ;
  }
}

export const deleteThumbnail = async ({ updata }: ThumbsTypes):Promise<ThumbsTypes | undefined> => {
  if(updata.type){
    const { data } = await api.delete(`/thumbnails/${updata.currentVideoId}?type=${updata.type}`);
    return data;
  }
  return ;
}


export const putAutoplayProps = async ({currentVideoId, autoplayPros}:PutAutoplayTypes):Promise<PutAutoplayTypes | undefined> => {
  
  if(currentVideoId){
    const { data } =  await api.put(`/autoplays/${currentVideoId}`, autoplayPros);;
    return data
  } else {
    return ;
  }

}

export const putContinueProps = async ({currentVideoId, continuePros}:PutContinueTypes):Promise<PutContinueTypes | undefined> => {
  
  if(currentVideoId){
    const { data } =  await api.put(`/resume_video_options/${currentVideoId}`, continuePros);;
    return data
  } else {
    return ;
  }

}


export const putSwictProps = async ({currentVideoId, swicthPros}:PutSwicthTypes):Promise<PutSwicthTypes | undefined> => {
  
  if(currentVideoId){
    const { data } =  await api.put(`/videos/${currentVideoId}`, swicthPros);;
    return data
  } else {
    return ;
  }

}

