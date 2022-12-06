export interface ExempleProps {
  //types your values props
}

export interface UserOptionProps {
  setUserOption: (setUserOption: string) => void;
}

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
  avatar?: string;
}

export interface videoPrppertyTypes {
  backgroundColor:string
  activeBigPlaygroung:boolean;
  activeSmalPlayground:boolean;
  displayVolume:boolean;  
  displayFullScrean:boolean;
  displayProgressBar:boolean;
  displayPlayTime:boolean;
  displayNextBtn:boolean;
  displayPrevBtn:boolean;
}

export interface VideoTypes {
  id: string;
  name: string;
  view_count: string;
  youtube_video_id: string;
  cover_image: string;
  date: string;
  duration: number;
}
