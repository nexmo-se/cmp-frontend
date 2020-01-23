import React from "react";
import styled from "styled-components";

function TodayStats(props){
  const Title = styled.h1`
    margin-bottom: 0px;
  `

  const SmallTitle = styled.small`
    font-size: 50%;
  `

  return (
    <React.Fragment>
      <Title>
        00:00:02 
        <SmallTitle className="Vlt-green">&nbsp; +00:00:01</SmallTitle>
      </Title>
      <p className="Vlt-grey">Compared to 00:00:03 yesterday</p>
    </React.Fragment>
  )
}
export default TodayStats;