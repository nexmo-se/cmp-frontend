import AuditLogsTable from "./components/AudioLogsTable";

function CampaignAuditLogCard () {
  return (
    <div className="Vlt-card Vlt-card--border">
      <div className="Vlt-card__header">
        <h4>Audit Logs</h4>
      </div>
      <div className="Vlt-card__content">
        <AuditLogsTable />
      </div>
    </div>
  )
}

export default CampaignAuditLogCard;
