import styled, { css } from "styled-components";
import importImage from "../../../services/importImage";

const WrapImage = styled.div`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  background: ${(props) => props.background || "#fff"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderRadius || "0"};

  &:before {
    padding-bottom: 56.25%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.borderRadius || "0"};
  object-position: center;
  display: flex;
  object-fit: cover;
`;

const ImageCustom = (props) => {
  return (
    <WrapImage {...props}>
      <Image
        {...props}
        src={props.src || importImage(props.src)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = importImage(props.src);
        }}
      />
    </WrapImage>
  );
};

export default ImageCustom;
