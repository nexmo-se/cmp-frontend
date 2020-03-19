import React from "react";

function InformationCard(){
  return (
    <div className="Vlt-card--gradient-wrapper Vlt-gradient--blue-to-pink">
      <div className="Vlt-card Vlt-card--border">
        <div className="Vlt-card__content">
          <p>API KEYS</p>
          <h4>
            <b>Learn how you can obtain your API Key from Vonage Platform.</b>
          </h4>
          <p>API Key is the most critical part of this Campaign Management Portal. Your API Key should be registered inside Vonage API platform.</p>
          <p>To obtain API key, please go to Vonage API platform</p>
          <br />
          <a 
            className="Vlt-text-link" 
            href="https://dashboard.nexmo.com/settings" 
            target="_blank"
            rel="noopener noreferrer" 
          >
            Obtain API Key
          </a>
        </div>
      </div>
    </div>
  )
}
export default InformationCard;
