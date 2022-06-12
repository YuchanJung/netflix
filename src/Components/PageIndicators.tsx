import styled from "styled-components";

const Container = styled.div<IPageIndicators>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.maxIndex}, 1fr);
  gap: 1px;
  position: absolute;
  top: 20px;
  right: 95px;
`;

const Block = styled.div`
  width: 18px;
  height: 3px;
`;

interface IPageIndicators {
  index: number;
  maxIndex: number;
}

function PageIndicators({ index, maxIndex }: IPageIndicators) {
  const blockArr = Array.from(Array(maxIndex + 1).keys());
  return (
    <Container index={index} maxIndex={maxIndex + 1}>
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
