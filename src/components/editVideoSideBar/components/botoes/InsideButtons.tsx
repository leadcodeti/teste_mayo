import { useEffect, useState } from "react";
import { useVideoContext } from "../../../../contexts/useContext";
import { api } from "../../../../services/api";
import { ButtonInsideVideo } from "./buttons";
import { useQuery } from "react-query";
import { getPropsButtonInside } from "../../../../pages/api/get_functions";
import { LoadingScreen } from "@vime/react";
import { LoadingScrean } from "../../../loading/loading";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";

interface ButtonInsideProps {
  background_color: string;
  background_hover: string;
  size: string;
  text: string;
  text_color: string;
  link: string;
  is_visible: boolean;
  start: number;
  end: number;
  position: string;
}

export function InsideButton() {
  const { buttonOption, videosId, setInsideButtonProps } = useVideoContext();
  const { watchVideoTime, setInsideButtonsValues, setPropsButtonInside } =
    usePlayeContext();

  const [buttonsInsidesProperty, setButtonsInsidesProperty] = useState(
    {} as ButtonInsideProps
  );

  useEffect(() => {
    setPropsButtonInside(buttonsInsidesProperty?.size);
  }, [buttonsInsidesProperty?.size, setPropsButtonInside]);

  const { data, isLoading } = useQuery(
    ["insideProps", videosId.currentVideoId, buttonOption],
    () => getPropsButtonInside(videosId.currentVideoId, buttonOption)
  );

  useEffect(() => {
    const buttonsProperty = data?.find((e: any) => e.type === "inside");

    setButtonsInsidesProperty({
      background_color: buttonsProperty?.background_color,
      background_hover: buttonsProperty?.background_hover,
      size: buttonsProperty?.size,
      text: buttonsProperty?.text,
      text_color: buttonsProperty?.text_color,
      link: buttonsProperty?.link,
      is_visible: buttonsProperty?.is_visible,
      start: buttonsProperty?.start,
      end: buttonsProperty?.end,
      position: buttonsProperty?.position,
    });

    setInsideButtonProps({
      is_visible: buttonsInsidesProperty?.is_visible,
    });
  }, [
    buttonOption,
    data,
    buttonsInsidesProperty.is_visible,
    setInsideButtonProps,
    videosId,
    setInsideButtonsValues,
    setPropsButtonInside,
  ]);

  return (
    <>
      {buttonsInsidesProperty?.start > 0 && buttonsInsidesProperty?.end > 0 ? (
        watchVideoTime ? (
          watchVideoTime > buttonsInsidesProperty?.start &&
          watchVideoTime < buttonsInsidesProperty?.end ? (
            isLoading ? (
              <LoadingScrean color="#ff003c" size="m" fontSize={0.9} />
            ) : (
              <ButtonInsideVideo
                href={buttonsInsidesProperty?.link}
                target="_blank"
                background_color={buttonsInsidesProperty.background_color}
                background_hover={buttonsInsidesProperty.background_hover}
                text_color={buttonsInsidesProperty.text_color}
                sizeWidth={
                  buttonsInsidesProperty.size === "125"
                    ? "20"
                    : buttonsInsidesProperty.size === "150"
                    ? "30"
                    : buttonsInsidesProperty.size === "250"
                    ? "50"
                    : ""
                }
                sizeFont={
                  buttonsInsidesProperty.size === "125"
                    ? "100%"
                    : buttonsInsidesProperty.size === "150"
                    ? "150%"
                    : buttonsInsidesProperty.size === "250"
                    ? "200%"
                    : ""
                }
              >
                {buttonsInsidesProperty.text == ""
                  ? "Saiba mais"
                  : buttonsInsidesProperty.text}
              </ButtonInsideVideo>
            )
          ) : (
            ""
          )
        ) : (
          ""
        )
      ) : isLoading ? (
        <LoadingScrean color="#ff003c" size="m" fontSize={0.9} />
      ) : (
        <ButtonInsideVideo
          href={buttonsInsidesProperty?.link}
          target="_blank"
          background_color={buttonsInsidesProperty.background_color}
          background_hover={buttonsInsidesProperty.background_hover}
          text_color={buttonsInsidesProperty.text_color}
          sizeWidth={
            buttonsInsidesProperty.size === "125"
              ? "20"
              : buttonsInsidesProperty.size === "150"
              ? "30"
              : buttonsInsidesProperty.size === "250"
              ? "50"
              : ""
          }
          sizeFont={
            buttonsInsidesProperty.size === "125"
              ? "100%"
              : buttonsInsidesProperty.size === "150"
              ? "150%"
              : buttonsInsidesProperty.size === "250"
              ? "200%"
              : ""
          }
        >
          {buttonsInsidesProperty.text == ""
            ? "Saiba mais"
            : buttonsInsidesProperty.text}
        </ButtonInsideVideo>
      )}
    </>
  );
}
