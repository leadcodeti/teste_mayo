export interface UserOptionProps {
  setUserOption: (setUserOption: string) => void;
}

export type User =
  | {
      id: string;
      email: string;
      avatar?: string;
      name: string;
      lastname?: string;
      phone?: string;
      password?: string;
      subscription: {
        subscriber_code: string;
        status: string;
        plan: string;
        price: number;
      };
    }
  | undefined;

export interface InputsProps {
  name: string;
  lastname?: string;
  phone?: string;
  type: string;
  placeholder: string;
  requiredInput: string;
}

export interface newUserDataProps {
  name?: string;
  lastname?: string;
  phone?: string;
  password?: string;
  avatar?: FormData | string;
}

export interface ThumbnailsProps {
  start_image: FileList;
  pause_image: FileList;
  final_image: FileList;
}

export interface ThumbnailsTypes {
  type:string;
  url: string;
}

export interface ControlType {
  isActive: boolean | undefined
}

export interface ControllerProps {
  has_big_play_button: boolean | undefined;
  has_small_play_button: boolean | undefined;
  has_progress_bar: boolean | undefined;
  has_video_duration: boolean | undefined;
  has_back_10_seconds: boolean | undefined;
  has_foward_10_seconds: boolean | undefined;
  has_volume: boolean | undefined;
  has_fullscreen: boolean | undefined;
}
[];

export type VideoTypes = {
  id: string;
  name: string;
  view_count: string;
  youtube_video_id: string;
  cover_image: string;
  date: string;
  duration: number;
  has_autoplay: boolean,
  has_progress_bar: boolean,
  has_cta_button: boolean,
  has_continue_options: boolean,
  has_thumbnail: boolean
};


export interface CreateVideoTypes {
  name: string;
  url: string;
}

export interface BackgroundProps {
  background_color: string;
}

export interface PutAutoplayTypes {
  currentVideoId:string;

  autoplayPros:{
    background_color?: string;
    bottom_tex?: string;
    top_text?:string;
    text_color?:string;
  }
}
