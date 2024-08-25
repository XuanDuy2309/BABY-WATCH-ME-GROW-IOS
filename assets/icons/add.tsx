import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props:SvgProps) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20 4C28.822 4 36 11.178 36 20C36 28.822 28.822 36 20 36C11.178 36 4 28.822 4 20C4 11.178 11.178 4 20 4ZM20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM30 18H22V10H18V18H10V22H18V30H22V22H30V18Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;
