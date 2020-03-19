import React from "react";

function TemplateInformationCard(){
  return (
    <div className="Vlt-card--gradient-wrapper Vlt-gradient--blue-to-pink">
      <div className="Vlt-card Vlt-card--border">
        <div className="Vlt-card__content">
          <p>TEMPLATES</p>
          <h4>
            <b>Learn how you can create your Template.</b>
          </h4>
          <p>Template is a crucial part for the Campaign. You need to setup a Template here. However, for WhatsApp Template, you need to set it up from Facebook Busienss Manager.</p>
          <p>A template paramtere is indicated by <code>{`{{ number }}`}</code>. Where number is the order of the parameters.</p>
          <p>If you don't know how to create a Campaign, you can go to QuickWizard section to learn more.</p>
        </div>
      </div>
    </div>
  )
}
export default TemplateInformationCard;
