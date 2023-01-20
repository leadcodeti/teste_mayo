import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import moment from "moment";
import { api } from "../../services/api"
import { BackgroundProps, User,ControllerProps,VideoTypes, ThumbnailsTypes } from "../../types/types";

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
    const { data } =await api.get<ControllerProps>(`/controls/${currentVideoId}`);
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
        has_autoplay: res.has_autoplay,
        has_progress_bar: res.has_progress_bar,
        has_cta_button: res.has_cta_button,
        has_continue_options: res.has_continue_options,
        has_thumbnail: res.has_thumbnail,
      };
    })

    return data;

  } else {
    return;
  }
}


export const getThumbnails = async (currentVideoId: string) => {
  
  if(currentVideoId){
    const { data } = await api.get<ThumbnailsTypes[]>(`/thumbnails/${currentVideoId}`);
    return data;
  } else {
    return ;
  }
}

interface AutoplayTypes {
  text_color: string;
  background_color: string;
  top_text: string;
  bottom_text: string;
}
export const getAutoPlayProps = async (currentVideoId: string) => {
  
  if(currentVideoId){
    const { data } = await api.get<AutoplayTypes>(`/autoplays/${currentVideoId}`);
    return data;
  } else {
    return ;
  }
}

export const getPropsButtonBelow = async (
  videosId: string,
  buttonOption: string
) => {
  if (videosId) {
    const { data: response } = await api.get(
      `/cta_buttons/${videosId}?type=${buttonOption}`
    );
    return response;
  } else {
    return;
  }
};