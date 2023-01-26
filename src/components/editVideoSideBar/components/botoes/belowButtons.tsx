import { useEffect, useState } from "react";
import { useVideoContext } from "../../../../contexts/useContext";
import { api } from "../../../../services/api";
import { ButtonBelowVideo } from "./buttons";
import { useQuery } from "react-query";
import { getPropsButtonBelow } from "../../../../pages/api/get_functions";
import { LoadingScreen } from "@vime/react";
import { LoadingScrean } from "../../../loading/loading";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";

interface ButtonBelowProps {
  background_color: string;
  background_hover: string;
  size: string;
  text: string;
  text_color: string;
  link: string;
  is_visible: boolean;
  start: number;
  end: number;
}

export function BelowButon() {
  const { buttonOption, videosId, setBelowButtonProps } = useVideoContext();
  const { watchVideoTime, setBellowButtonsValues, setPropsButtonBelow } =
    usePlayeContext();

  const [buttonsBelowsProperty, setButtonsBelowsProperty] = useState(
    {} as ButtonBelowProps
  );

  useEffect(() => {
    setPropsButtonBelow(buttonsBelowsProperty?.size);
  }, [buttonsBelowsProperty?.size, setPropsButtonBelow]);

  const { data, isLoading } = useQuery(
    ["belowProps", videosId.currentVideoId, buttonOption],
    () => getPropsButtonBelow(videosId.currentVideoId, buttonOption)
  );
  useEffect(() => {
    const buttonsProperty = data?.find((e: any) => e.type === "below");

    setButtonsBelowsProperty({
      background_color: buttonsProperty?.background_color,
      background_hover: buttonsProperty?.background_hover,
      size: buttonsProperty?.size,
      text: buttonsProperty?.text,
      text_color: buttonsProperty?.text_color,
      link: buttonsProperty?.link,
      is_visible: buttonsProperty?.is_visible,
      start: buttonsProperty?.start,
      end: buttonsProperty?.end,
    });

    setBelowButtonProps({
      is_visible: buttonsBelowsProperty?.is_visible,
    });
  }, [
    buttonOption,
    data,
    buttonsBelowsProperty.is_visible,
    setBelowButtonProps,
    videosId,
    setBellowButtonsValues,
    setPropsButtonBelow,
  ]);

  return (
    <>
      {buttonsBelowsProperty?.start > 0 && buttonsBelowsProperty?.end > 0 ? (
        watchVideoTime ? (
          watchVideoTime > buttonsBelowsProperty?.start &&
          watchVideoTime < buttonsBelowsProperty?.end ? (
            isLoading ? (
              <LoadingScrean color="#ff003c" size="m" fontSize={0.9} />
            ) : (
              <ButtonBelowVideo
                href={"#"}
                target="_blank"
                background_color={buttonsBelowsProperty.background_color}
                background_hover={buttonsBelowsProperty.background_hover}
                text_color={buttonsBelowsProperty.text_color}
                sizeWidth={
                  buttonsBelowsProperty.size === "125"
                    ? "180px"
                    : buttonsBelowsProperty.size === "150"
                    ? "250px"
                    : buttonsBelowsProperty.size === "250"
                    ? "350px"
                    : ""
                }
                sizeFont={
                  buttonsBelowsProperty.size === "125"
                    ? "100%"
                    : buttonsBelowsProperty.size === "150"
                    ? "150%"
                    : buttonsBelowsProperty.size === "250"
                    ? "200%"
                    : ""
                }
              >
                {buttonsBelowsProperty.text == ""
                  ? "Saiba mais"
                  : buttonsBelowsProperty.text}
              </ButtonBelowVideo>
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
        <ButtonBelowVideo
          href={"#"}
          target="_blank"
          background_color={buttonsBelowsProperty.background_color}
          background_hover={buttonsBelowsProperty.background_hover}
          text_color={buttonsBelowsProperty.text_color}
          sizeWidth={
            buttonsBelowsProperty.size === "125"
              ? "180px"
              : buttonsBelowsProperty.size === "150"
              ? "250px"
              : buttonsBelowsProperty.size === "250"
              ? "350px"
              : ""
          }
          sizeFont={
            buttonsBelowsProperty.size === "125"
              ? "100%"
              : buttonsBelowsProperty.size === "150"
              ? "150%"
              : buttonsBelowsProperty.size === "250"
              ? "200%"
              : ""
          }
        >
          {buttonsBelowsProperty.text == ""
            ? "Saiba mais"
            : buttonsBelowsProperty.text}
        </ButtonBelowVideo>
      )}
    </>
  );
}
