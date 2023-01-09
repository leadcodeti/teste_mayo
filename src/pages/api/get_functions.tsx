import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import moment from "moment";
import { api } from "../../services/api"
import { BackgroundProps, User, videoPrppertyTypes, VideoTypes } from "../../types/types";

export const getDesign = async (currentVideoId: string) => {
  
  if(currentVideoId){
    const { data } = await api.get<BackgroundProps>(`/designs/${currentVideoId}`)
    return data;
  } else {
    return ;
  }

}

export const getControllers = async (currentVideoId: string) => {
  
  if(currentVideoId){
    const { data } =await api.get<videoPrppertyTypes>(`/controls/${currentVideoId}`);
    return data;
  } else {
    return ;
  }
}

export const getAllVideos = async (user: User,page: number) => {
  
  if( user && page){
    const { data:response } = await api.get(`/videos?limit=5&page=${page}`);
    const totalVideo:number = response.total;

    const data = response.items.map((res:VideoTypes) => {
      return {
        id: res.id,
        name: res.name,
        view_count: res.view_count,
        youtube_video_id: res.youtube_video_id,
        date: format(new Date(res.date), "dd/MM/yyyy", {
          locale: ptBR,
        }),
        duration: moment.duration(`${res.duration}`).asMilliseconds(),
        total: totalVideo,
      };
    })

    return data;

  } else {
    return;
  }
}