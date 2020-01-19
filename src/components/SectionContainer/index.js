import React from "react";
import styled from "styled-components";

const Container = styled.section`
  max-width: 1200px;
  padding: 32px 32px 60px;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  @media only screen and (max-width: 575px){
    padding-top: 60px;
  }
`

function SectionContainer(props){
  const { children } = props;
  return (
    <Container>
      {children}
    </Container>
  )
}
export default SectionContainer;