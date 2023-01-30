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
  const { videosId } = useVideoContext();

  
  const queryClient = useQueryClient ()

  const [hasFakeBar, setHasFakeBar] = useState<boolean | undefined>();
  const [hasContinue, setHasContinue] = useState<boolean | undefined>(false);
  const [hasAutoPlay, setHasAutoPlay] = useState<boolean | undefined>(false);
  const [hasThumbNails, setHasThumbnails] = useState<boolean | undefined>(false);

  const { mutateAsync: switchMutation, isLoading } = useMutation(putSwictProps,{
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
    },
  });

  useEffect(() =>{
    setHasFakeBar(selectedVideo?.has_progress_bar)
    setHasAutoPlay(selectedVideo?.has_autoplay)
    setHasContinue(selectedVideo?.has_continue_options)
    setHasThumbnails(selectedVideo?.has_thumbnail)
  },[selectedVideo?.has_autoplay, selectedVideo?.has_continue_options, selectedVideo?.has_progress_bar, selectedVideo?.has_thumbnail, setSaveSwitch])

  useEffect(() => {
    setActiveAccordion ({
      activeContinue: hasContinue,
      activeAutoPlay: hasAutoPlay,
      activeFakeBar: hasFakeBar,
      activeThumbNails: hasThumbNails,
    })

  },[hasAutoPlay, hasContinue, hasFakeBar, hasThumbNails,setActiveAccordion])


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
    
     setSaveSwitch({
      saveFakeBar:false,
    });
  }

  async function upDataContinueSwitch() {
    await switchMutation({
      currentVideoId: videosId.currentVideoId,
      swicthPros :{
       has_continue_options: hasContinue,
      }
     })

     setSaveSwitch({
      saveContinue:false,
    });
  }

  async function upDataThumbnailSwitch() {
    await switchMutation({
      currentVideoId: videosId.currentVideoId,
      swicthPros :{
       has_thumbnail: hasThumbNails,
      }
     })

     setSaveSwitch({
      saveThumbNails:false,
    });
  }
  async function upDataAutoplaySwitch() {
    await switchMutation({
      currentVideoId: videosId.currentVideoId,
      swicthPros :{
      has_autoplay: hasAutoPlay,
      }
     })

     setSaveSwitch({
      saveAutoPlay:false,
    });
  }

  async function fakeBarIsVibiles() {
    setHasFakeBar(!hasFakeBar);
    setSaveSwitch({
      saveFakeBar: true,
    })
  }

  async function continueIsVisible() {
    setHasContinue(!hasContinue);
    setSaveSwitch({
      saveContinue: true,
    })
  }

  async function autoPlayIsVisible() {
    setHasAutoPlay(!hasAutoPlay);
    setSaveSwitch({
      saveAutoPlay: true,
    })
  }



  async function thumbnailsIsVisible() {
    setHasThumbnails(!hasThumbNails);
    setSaveSwitch({
      saveThumbNails: true,
    })

  }

  return {
    fakeBarIsVibiles,
    continueIsVisible,
    thumbnailsIsVisible,
    autoPlayIsVisible,

    upDataFakeBarSwitch,
    upDataAutoplaySwitch,
    upDataContinueSwitch,
    upDataThumbnailSwitch
  }
}
