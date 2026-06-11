import Svg, { Circle, Path, Rect } from "react-native-svg";

interface Props {
  size?: number;
}

export function HostelLogo({ size = 52 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <Rect x="4" y="22" width="44" height="26" rx="4" fill="#1a56db" />
      <Path
        d="M2 26L26 6L50 26"
        stroke="#1a56db"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x="18" y="32" width="16" height="16" rx="2" fill="white" />
      <Circle cx="26" cy="40" r="2.5" fill="#1a56db" />
    </Svg>
  );
}
