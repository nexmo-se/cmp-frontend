import React from "react";
import styled from "styled-components";

function DeliveryStatsCard(props){
  const { channel, now, then } = props;
  const Title = styled.h1`
    margin-bottom: 0;
  `

  const SmallTitle = styled.small`
    font-size: 50%
  `

  return (
    <div className="Vlt-card">
      <div className="Vlt-card__content">
        <p><b>{channel.toUpperCase()} DELIVERY RATE</b></p>
        <div className="Vlt-grid">
          <div className="Vlt-col" style={{ alignSelf: "center" }}>
            <Title>
              <b>{now}%</b> &nbsp;
              <SmallTitle><b className="Vlt-green">+{now - then}%</b></SmallTitle>
            </Title>
            <p className="Vlt-grey">Compared to {then}% last month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeliveryStatsCard;