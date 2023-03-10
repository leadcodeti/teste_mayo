import styled from "styled-components";

interface ButtonStyles {
  background_color: string | undefined;
  background_hover: string | undefined;
  text_color?: string;
  sizeWidth: string | undefined;
  sizeFont: string;
}

export const ButtonBelowVideo = styled.a<ButtonStyles>`
  margin-top: 0.3rem;
  background: ${(props) => props.background_color};
  color: ${(props) => props.text_color};
  width: ${(props) => props.sizeWidth}%;
  font-size: ${(props) => props.sizeFont};
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  -webkit-box-shadow: 0px 0px 46px -18px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 46px -18px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 46px -18px rgba(0, 0, 0, 0.75);

  &:hover {
    background: ${(props) => props.background_hover};
    color: ${(props) => props.text_color};
  }
`;

export const ButtonInsideVideo = styled.a<ButtonStyles>`
  margin: 1rem;
  background: ${(props) => props.background_color};
  color: ${(props) => props.text_color};
  width: ${(props) => props.sizeWidth}%;
  font-size: ${(props) => props.sizeFont};
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  text-align: center;
  justify-content: center;
  /* align-items: center; */
  justify-self: center;
  -webkit-box-shadow: 0px 0px 46px -18px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 46px -18px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 46px -18px rgba(0, 0, 0, 0.75);
  z-index: 51 !important;

  &:hover {
    background: ${(props) => props.background_hover};
    color: ${(props) => props.text_color};
  }
`;

export const CustomButtonStyles = styled.a``;
