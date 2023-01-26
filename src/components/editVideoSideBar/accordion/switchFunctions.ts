import { use, useEffect, useState } from "react";
import { useSideBarContext } from "../../../contexts/thirdContext";
import { useVideoContext } from "../../../contexts/useContext";
import { api } from "../../../services/api";

interface SwitchTipy {
  isActive: boolean;
}

export function Switch() {
  const { allVideo, setActiveAccordion, activeAccordion, setCheckFakebar } =
    useSideBarContext();

  const { currentVideo, videosId } = useVideoContext();

  const [hasFakeBar, setHasFakeBar] = useState({} as SwitchTipy);
  const [hasContinue, setHasContinue] = useState({} as SwitchTipy);
  const [hasAutoPlay, setHasAutoPlay] = useState({} as SwitchTipy);
  const [hasThumbNails, setHasThumbnails] = useState({} as SwitchTipy);

  useEffect(() => {
    setCheckFakebar(hasFakeBar.isActive);
    setActiveAccordion({
      activeContinue: hasContinue.isActive,
      activeAutoPlay: hasAutoPlay.isActive,
      activeFakeBar: hasFakeBar.isActive,
      activeThumbNails: hasThumbNails.isActive,
    });
  }, [
    allVideo,
    currentVideo.currentVideoId,
    hasAutoPlay.isActive,
    hasContinue.isActive,
    hasFakeBar.isActive,
    hasThumbNails.isActive,
    setActiveAccordion,
    setCheckFakebar,
  ]);

  async function fakeBarIsVibiles() {
    setHasFakeBar({ isActive: !hasFakeBar.isActive });

    await api.put(`/videos/${videosId.currentVideoId}`, {
      has_progress_bar: hasFakeBar.isActive,
    });
  }
  async function continueIsVisible() {
    setHasContinue({ isActive: !hasContinue.isActive });

    await api.put(`/videos/${videosId.currentVideoId}`, {
      has_continue_options: hasContinue.isActive,
    });
  }

  async function autoPlayIsVisible() {
    setHasAutoPlay({ isActive: !hasAutoPlay.isActive });

    await api.put(`/videos/${videosId.currentVideoId}`, {
      has_autoplay: hasAutoPlay.isActive,
    });
  }

  async function thumbnailsIsVisible() {
    setHasThumbnails({ isActive: !hasThumbNails.isActive });

    await api.put(`/videos/${videosId.currentVideoId}`, {
      has_thumbnail: hasThumbNails.isActive,
    });
  }

  return {
    hasContinue,
    hasFakeBar,
    hasAutoPlay,
    hasThumbNails,

    fakeBarIsVibiles,
    continueIsVisible,
    thumbnailsIsVisible,
    autoPlayIsVisible,
  };
}
