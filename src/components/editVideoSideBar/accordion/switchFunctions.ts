import { use, useEffect, useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { useSideBarContext } from "../../../contexts/thirdContext";
import { useVideoContext } from "../../../contexts/useContext";
import { putSwictProps } from "../../../pages/api/post_put_functions";
import { api } from "../../../services/api";
import { VideoTypes } from "../../../types/types";


export function Switch() {

  const { allVideo, setActiveAccordion, setSaveSwitch, setCheckFakebar} = useSideBarContext() 
  const [selectedVideo, setSelectedVideo] = useState({} as VideoTypes | undefined);
  const { currentVideo,videosId } = useVideoContext();
  
  const queryClient = useQueryClient ()


  const [hasFakeBar, setHasFakeBar] = useState<boolean | undefined>();
  const [hasContinue, setHasContinue] = useState<boolean | undefined>(false);
  const [hasAutoPlay, setHasAutoPlay] = useState<boolean | undefined>(false);
  const [hasThumbNails, setHasThumbnails] = useState<boolean | undefined>(false);

  const { mutateAsync: switchMutation, data } = useMutation(putSwictProps,{
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
    },
  });

  useEffect(() =>{
    setHasFakeBar(selectedVideo?.has_progress_bar)
  },[selectedVideo?.has_progress_bar])

  useEffect(() => {
    setActiveAccordion ({
      activeContinue: hasContinue,
      activeAutoPlay: hasAutoPlay,
      activeFakeBar: hasFakeBar,
      activeThumbNails: hasThumbNails,
    })

  },[hasAutoPlay,hasContinue, hasFakeBar, hasThumbNails,setActiveAccordion])


  useEffect(() => {
    const video = allVideo?.find((video) => video.id === videosId.currentVideoId)
    setSelectedVideo(video)
  },[allVideo, videosId.currentVideoId])


  async function upDataFakeBarSwitch() {
    await switchMutation({
      currentVideoId: videosId.currentVideoId,
      swicthPros :{
       has_progress_bar: hasFakeBar,
      }
     })
  }

  async function fakeBarIsVibiles() {
    setHasFakeBar(!hasFakeBar);
    setSaveSwitch(true)
  }

  

  async function continueIsVisible() {
    setHasContinue(!hasContinue);
  }

  async function autoPlayIsVisible() {
    setHasAutoPlay(!hasAutoPlay);
  }



  async function thumbnailsIsVisible() {
    setHasThumbnails(hasThumbNails);

  }

  return {
    fakeBarIsVibiles,
    continueIsVisible,
    thumbnailsIsVisible,
    autoPlayIsVisible,

    upDataFakeBarSwitch
  }
}
