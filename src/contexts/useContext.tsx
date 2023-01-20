import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { api } from "../services/api";
import Router from "next/router";

import { setCookie, parseCookies, destroyCookie } from "nookies";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { newUserDataProps, VideoTypes, ThumbnailsProps, User } from "../types/types";
import moment from "moment";

type SignInCredentials = {
  email: string;
  password: string;
};

interface CurrentVideoType {
  currentVideoId: string;
  currentPlayerId: string;
}

interface videosId {
  currentVideoId: string;
  currentPlayerId: string;
  videoName: string;
}

interface AuthContextProps {
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser: (newDataUser: newUserDataProps) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  modalNewVideoOpen: boolean;
  openModalNewVideo: () => void;
  closeModalNewVideo: () => void;
  user: User | undefined;
  isAuthenticated: boolean;
  setCurrentVideo: Dispatch<SetStateAction<CurrentVideoType>>;
  modalOpen: boolean;
  currentVideo: CurrentVideoType;
  buttonOption: string;
  setButtonOption: (value: string) => void;
  buttoBelowVideo: () => void;
  buttonInsideVideo: () => void;
  modalNewButtonOpen: boolean;
  openModalNewButton: () => void;
  closeModalNewButton: () => void;
  buttonPosition: string;
  setButtonPosition: (value: string) => void;
  buttonProps: any;
  setButtonProps: any;
  videosId: videosId;
  belowButtonProps: any;
  setBelowButtonProps: any;
  isVisibleBelow: () => void;
  setIsVisibleButtonBelow: (value: boolean) => void;
  isVisibleButtonBelow: boolean;
  continuarProps: any;
  setContinuarProps: any;
  autoPLayProps: any;
  setAutoPlayProps: any;
  continuarIsVisible: boolean;
  setContinuarIsVisible: (value: boolean) => void;
  // fakeBarIsVisible: boolean;
  // setFakeBarIsVisible: (value: boolean) => void;
  heightFakeBar: string;
  setHeightFakeBar: (value: string) => void;
  fakeBarData: any;
  setFakeBarData: any;
  videoTime: number;
  setVideoTime: (value: number) => void;
  currentVideoTime: any;
  setCurrentVideoTime: any;
  formatedTime: number;
  setFormatedTime: (value: number) => void;
  pausedVideoThumb: boolean | undefined;
  setPausedVideoThumb: any;
  finalVideoThumb: boolean | undefined;
  setFinalVideoThumb: any;
  startVideoThumb: boolean;
  setStartVideoThumb: any;
  thumbnailsProps: any;
  setThumbnailsProps: any;
  page: number;
  setPage: (value: number) => void;
  totalUserVideos: number;
}

type AuthProviderProps = {
  children: ReactNode;
};

type belowButton = {
  background_color: string;
  background_hover: string;
  size: string;
  text: string;
  text_color: string;
  link: string;
  is_visible: boolean;
};

type continuarButtonProps = {
  background_color: string;
  message: string;
  continue_button_text: string;
  restart_button_text: string;
  text_color: string;
};

type AutoPlayProps = {
  text_color: string;
  background_color: string;
  top_text: string;
  bottom_text: string;
};

type TypesFakeBarData = {
  height: string;
  finish: boolean;
};

export const AuthContext = createContext({} as AuthContextProps);

export function signOut() {
  destroyCookie(undefined, "mayoPLayer.token");
  Router.push("/login");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNewButtonOpen, setModalNewButtonOpen] = useState(false);
  const [modalNewVideoOpen, setModalNewVideoOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState("center-center");
  const [currentVideo, setCurrentVideo] = useState<CurrentVideoType>(
    {} as CurrentVideoType
  );

 
  const [videosId, setVideosId] = useState<videosId>({} as videosId);
  const [buttonOption, setButtonOption] = useState("below");
  const [isVisibleButtonBelow, setIsVisibleButtonBelow] = useState<any>(false);
  const [videoTime, setVideoTime] = useState(0);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [formatedTime, setFormatedTime] = useState(0);
  const [pausedVideoThumb, setPausedVideoThumb] = useState(false);
  const [finalVideoThumb, setFinalVideoThumb] = useState(false);
  const [startVideoThumb, setStartVideoThumb] = useState(false);
  const [buttonProps, setButtonProps] = useState({
    background_color: "",
    background_hover: "",
    size: "",
    text: "",
    text_color: "",
    link: "",
    position: "",
  });
  const [belowButtonProps, setBelowButtonProps] = useState<any>({
    background_color: "",
    background_hover: "",
    size: "",
    text: "",
    text_color: "",
    link: "",
    is_visible: isVisibleButtonBelow,
  });
  const [continuarProps, setContinuarProps] = useState<continuarButtonProps>({
    background_color: "",
    message: "",
    continue_button_text: "",
    restart_button_text: "",
    text_color: "",
  });

  const [autoPLayProps, setAutoPlayProps] = useState<AutoPlayProps>({
    text_color: "",
    background_color: "",
    top_text: "",
    bottom_text: "",
  });

  const [continuarIsVisible, setContinuarIsVisible] = useState(false);
  const [heightFakeBar, setHeightFakeBar] = useState("");
  const [fakeBarData, setFakeBarData] = useState<TypesFakeBarData>({
    height: "",
    finish: false,
  });
  const [thumbnailsProps, setThumbnailsProps] = useState({
    start_image: "",
    pause_image: "",
    final_image: "",
  });

  const [page, setPage] = useState(1);
  const [totalUserVideos, setTotalUserVideos] = useState(0);

  async function isVisibleContinuar() {
    await api(`/resume_video_options/${videosId.currentVideoId}`).then(
      (res) => {
        setContinuarProps({
          message: res.data.message,
          continue_button_text: res.data.continue_button_text,
          restart_button_text: res.data.restart_button_text,
          text_color: res.data.text_color,
          background_color: res.data.background_color,
        });
      }
    );
    setContinuarIsVisible(!continuarIsVisible);
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function openModalNewVideo() {
    setModalNewVideoOpen(true);
  }

  function closeModalNewVideo() {
    setModalNewVideoOpen(false);
  }

  function buttoBelowVideo() {
    setButtonOption("below");
  }

  function buttonInsideVideo() {
    setButtonOption("inside");
  }

  function openModalNewButton() {
    setModalNewButtonOpen(true);
  }

  function closeModalNewButton() {
    setModalNewButtonOpen(false);
  }

  async function isVisibleBelow() {
    setIsVisibleButtonBelow(!isVisibleButtonBelow);
    await api.put(
      `/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`,
      {
        is_visible: isVisibleButtonBelow,
      }
    );
  }

  const { "mayoPLayer.token": token } = parseCookies();

  useEffect(() => {
    if (token) {
      api("/me").then((response) => {
        const { email, name, phone, avatar, lastname, id, subscription } =
          response.data;

        setUser({
          email,
          name,
          phone,
          avatar,
          lastname,
          id,
          subscription,
        });
      });
    }
  }, [token]);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token } = response.data;

      setCookie(undefined, "mayoPLayer.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      if (token) {
        api("/me").then((response) => {
          const { email, name, phone, avatar, lastname, id, subscription } =
            response.data;
          setUser({ email, name, phone, avatar, lastname, id, subscription });
        });
      }

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  async function updateUser(newDataUser: newUserDataProps) {
    await api.put(`/users/${user?.id}`, newDataUser);

    const headers = { "Content-Type": "multipart/form-data" };

    await api.patch("/users/avatar", newDataUser.avatar, { headers: headers });

    await api("/me").then((res) => setUser(res.data));
  }


  
  useEffect(() => {
    if (currentVideo) {
      const getIds = JSON.parse(localStorage.getItem("@myVideoPlayerId") || "");
      if (getIds !== null) {
        setVideosId(getIds);
      }
    }
  }, [currentVideo]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
        setCurrentVideo,
        user,
        videosId,
        currentVideo,
        updateUser,
        modalOpen,
        closeModal,
        openModal,
        modalNewVideoOpen,
        openModalNewVideo,
        closeModalNewVideo,

        buttonOption,
        setButtonOption,
        buttoBelowVideo,
        buttonInsideVideo,
        modalNewButtonOpen,
        openModalNewButton,
        closeModalNewButton,
        buttonPosition,
        setButtonPosition,
        buttonProps,
        setButtonProps,
        belowButtonProps,
        setBelowButtonProps,
        isVisibleBelow,
        setIsVisibleButtonBelow,
        isVisibleButtonBelow,
        continuarProps,
        setContinuarProps,
        continuarIsVisible,
        setContinuarIsVisible,

        heightFakeBar,
        setHeightFakeBar,
        fakeBarData,
        setFakeBarData,
        videoTime,
        setVideoTime,
        currentVideoTime,
        setCurrentVideoTime,
     
        formatedTime,
        setFormatedTime,
        autoPLayProps,
        setAutoPlayProps,
        pausedVideoThumb,
        setPausedVideoThumb,
        finalVideoThumb,
        setFinalVideoThumb,
        thumbnailsProps,
        setThumbnailsProps,
        page,
        setPage,
        totalUserVideos,
        startVideoThumb,
        setStartVideoThumb,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useVideoContext() {
  const new_context = useContext(AuthContext);
  return new_context;
}
