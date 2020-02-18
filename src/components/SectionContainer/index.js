import React from "react";
import styled from "styled-components";

const Content = styled.section`
  max-width: 1200px;
  padding: 32px 32px 60px;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 575px){
    padding-top: 60px;
  }
`

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

function SectionContainer({ children }){
  return (
    <Container>
      <Content>
        {children}
      </Content>
    </Container>
  )
}
export default SectionContainer;