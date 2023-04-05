import styled from "styled-components";
import tw from "twin.macro";

export const Container = tw.div`relative`;

export const ContentWithPaddingXl = styled.div`
  ${tw`max-w-screen-xl mx-auto py-20 lg:py-24`}
  background-color: #e9cbb5;
`;