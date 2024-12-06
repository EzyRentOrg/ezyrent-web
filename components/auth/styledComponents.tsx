import styled from 'styled-components';

export const AbsoluteImage = styled.img`
  width: 312px;
  height: 366px;
  position: absolute;
  box-shadow: 0px 10px 30px 0px #00000026;
  border-radius: 8px;
  background-size: cover;
`;

export const RelativeImage = styled.img`
  width: 312px;
  height: 366px;
  position: relative;
  box-shadow: 0px 10px 30px 0px #00000026;
  border-radius: 8px;
  background-size: cover;
`;

export const MainContainer = styled.div`
  minheight: 100vh;
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #dedbff 13.5%, #fdfcff 100%);
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 150px;
  padding-top: 16vh;
`;
