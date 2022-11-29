import styled from "styled-components";

interface ButtonStyles {
  background: string;
  hover: string;
  color: string;
  sizeWidth: string;
  sizeHeight: string;
  sizeFont: string;
}

export const ButtonBelowVideo = styled.a<ButtonStyles>`
  margin-top: 0.3rem;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  width: ${(props) => props.sizeWidth};
  height: ${(props) => props.sizeHeight};
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
    background: ${(props) => props.hover};
    color: ${(props) => props.color};
  }
`;
