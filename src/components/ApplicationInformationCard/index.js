import React from "react";

function ApplicationInformationCard(){
  return (
    <div className="Vlt-card--gradient-wrapper Vlt-gradient--blue-to-pink">
      <div className="Vlt-card Vlt-card--border">
        <div className="Vlt-card__content">
          <p>APPLICATIONS</p>
          <h4>
            <b>Learn how you can obtain your Application ID from Vonage API Platform</b>
          </h4>
          <p>Before you are able to add an Application to this platform, first you need to create an application directly in Vonage API Platform. Please do not lost your private key</p>
          <p>To obtain Application ID, please go to Vonage API platform</p>
          <br />
          <a 
            className="Vlt-text-link" 
            href="https://dashboard.nexmo.com/applications" 
            target="_blank"
            rel="noopener noreferrer" 
          >
            Obtain Application ID
          </a>
        </div>
      </div>
    </div>
  )
}
export default ApplicationInformationCard;
