import React from "react";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
`

function PageContainer(props){
  const { children } = props;

  return (
    <Container>
      {children}
    </Container>  
  )
}
export default PageContainer;