import { useEffect, useState } from "react";
import { useVideoContext } from "../../../../contexts/useContext";
import { api } from "../../../../services/api";
import { ButtonBelowVideo } from "./buttons";

interface ButtonBelowProps {
  background_color: string;
  background_hover: string;
  size: string;
  text: string;
  text_color: string;
  link: string;
  is_visible: boolean;
}

export function BelowButon() {
  const { buttonOption, videosId, setBelowButtonProps } = useVideoContext();

  const [buttonsBelowsProperty, setButtonsBelowsProperty] = useState(
    {} as ButtonBelowProps
  );

  console.log("teste-343", buttonsBelowsProperty);

  useEffect(() => {
    async function getButtonsBelowsProperty() {
      const response = await api.get(
        `/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`
      );

      const buttonsProperty = response.data.find(
        (e: any) => e.type === "below"
      );
    
      setButtonsBelowsProperty({
        background_color: buttonsProperty.background_color,
        background_hover: buttonsProperty.background_hover,
        size: buttonsProperty.size,
        text: buttonsProperty.text,
        text_color: buttonsProperty.text_color,
        link: buttonsProperty.link,
        is_visible: buttonsProperty.is_visible,
      });

      setBelowButtonProps({
        is_visible: buttonsBelowsProperty.is_visible
      });
      
    }

    getButtonsBelowsProperty();
  }, [buttonOption, buttonsBelowsProperty.is_visible, setBelowButtonProps, videosId]);

  return (
    <ButtonBelowVideo
      href={"#"}
      target="_blank"
      background={buttonsBelowsProperty.background_color}
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
  );
}
