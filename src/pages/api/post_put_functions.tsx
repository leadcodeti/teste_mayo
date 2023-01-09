import { api } from "../../services/api"
import { BackgroundProps, CreateVideoTypes } from "../../types/types";

export interface PutDesignTypes {
  currentVideoId:string;
  newDesignData: {
    background_color: string | undefined;
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

export const putControllers = async (currentVideoId: string,newControlersData:string) => {
  
  if(currentVideoId){
    const { data } =await api.put(`/controls/${currentVideoId}`, newControlersData);
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