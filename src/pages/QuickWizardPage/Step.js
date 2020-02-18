import React from "react";
import styled from "styled-components";

import Button from "components/Button";

const Container = styled.div`
  display: flex; 
  justify-content: space-between;
  align-items: center;
`;

function Step({ number, label, buttonLabel, onClick }){

  return (
    <Container>
      <div>
        <span className="Vlt-number" data-index={number} />
        <span className="p-large">{label}</span>
      </div>
      <Button type="tertiary" onClick={onClick}>{buttonLabel}</Button>
    </Container>
  )
}
export default Step;