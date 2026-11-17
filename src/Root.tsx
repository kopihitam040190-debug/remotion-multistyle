import "./index.css";
import { Composition } from "remotion";
import { MultiStyle } from "./MultiStyle/MultiStyle";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MultiStyle"
        component={MultiStyle}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};