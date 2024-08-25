import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={28}
    height={34}
    viewBox="0 0 28 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M0 34H28V30H0V34ZM28 12H20V0H8V12H0L14 26L28 12Z" fill="#FF7991" />
  </Svg>
);
export default SVGComponent;
