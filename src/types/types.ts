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

export interface ControolerTypes {
  bigPlay: boolean | undefined;
  nextBtn: boolean | undefined;
  playTime: boolean | undefined;
  prevBtn: boolean | undefined;
  fullScrean: boolean | undefined;
  smalPlay: boolean | undefined;
  volume: boolean | undefined;
  progressBar: boolean | undefined;
}

export interface videoPrppertyTypes {
  backgroundColor: string;
  has_big_play_button: boolean;
  has_small_play_button: boolean;
  has_volume: boolean;
  has_fullscreen: boolean;
  has_progress_bar: boolean;
  has_video_duration: boolean;
  has_foward_10_seconds: boolean;
  has_back_10_seconds: boolean;
}
[];

export interface ControllsTypes {
  backgroundColor: string;
  activeBigPlaygroung: boolean;
  activeSmalPlayground: boolean;
  displayVolume: boolean;
  displayFullScrean: boolean;
  displayProgressBar: boolean;
  displayPlayTime: boolean;
  displayNextBtn: boolean;
  displayPrevBtn: boolean;
}

export type VideoTypes = {
  id: string;
  name: string;
  view_count: string;
  youtube_video_id: string;
  cover_image: string;
  date: string;
  duration: number;
};


export interface CreateVideoTypes {
  name: string;
  url: string;
}

export interface BackgroundProps {
  background_color: string;
}
