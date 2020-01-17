import React from "react";
import styled from "styled-components";

const Container = styled.section`
  max-width: 1200px;
  padding: 32px;
  width: 100%;
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