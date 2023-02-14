import styled from "styled-components";
import { useOffset } from "../hooks/useOffset";
import { useWindowSize } from "../hooks/useWindowSize";
import { returnSliderInfo } from "../utils";

const Container = styled.div<IPageIndicators>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.maxIndex}, 1fr);
  gap: 0.1vw;
  position: absolute;
  top: 1.2vw;
  right: calc(4% + ${(props) => props.gapWidth}px);
`;

const Block = styled.div`
  width: 1.5vw;
  height: 0.2vw;
`;

interface IPageIndicators {
  index: number;
  maxIndex: number;
  gapWidth: number;
}

function PageIndicators({ index, maxIndex, gapWidth }: IPageIndicators) {
  const blockArr = Array.from(Array(maxIndex + 1).keys());
  return (
    <Container index={index} maxIndex={maxIndex + 1} gapWidth={gapWidth}>
      {blockArr.map((i) => (
        <Block
          key={i}
          style={{ backgroundColor: i === index ? "#aaaaaa" : "#4d4d4d" }}
        />
      ))}
    </Container>
  );
}

export default PageIndicators;
