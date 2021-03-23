import React from "react";

import AuditLogsTable from "./AuditLogsTable";

function CampaignAuditLogCard({ campaign }){
  return (
    <div className="Vlt-card Vlt-card--border">
      <div className="Vlt-card__header">
        <h4>Audit Logs</h4>
      </div>
      <div className="Vlt-card__content">
        <AuditLogsTable campaign={campaign} />
      </div>
    </div>
  )
}
export default CampaignAuditLogCard;