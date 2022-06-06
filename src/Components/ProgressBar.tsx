import styled from "styled-components";

const Bar = styled.div<IProgressBar>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.maxIndex}, 1fr);
  gap: 1px;
  position: absolute;
  right: 95px;
  top: -20px;
`;

const Block = styled.div`
  width: 18px;
  height: 3px;
`;

interface IProgressBar {
  index: number;
  maxIndex: number;
}

function ProgressBar({ index, maxIndex }: IProgressBar) {
  const blockArr = Array.from(Array(maxIndex + 1).keys());
  return (
    <Bar index={index} maxIndex={maxIndex + 1}>
      {blockArr.map((i) => (
        <Block
          key={i}
          style={{ backgroundColor: i === index ? "#aaaaaa" : "#4d4d4d" }}
        />
      ))}
    </Bar>
  );
}

export default ProgressBar;
