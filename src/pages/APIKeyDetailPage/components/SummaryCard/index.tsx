import ApiKey from "entities/apiKey";
import clsx from "clsx";
import useStyles from "./styles";

import ApplicationSummary from "../ApplicationSummary";
import ChannelSummary from "../ChannelSummary";

interface SummaryCardProps {
  apiKey: ApiKey;
}

function SummaryCard ({ apiKey }) {
  const mStyles = useStyles();

  return (
    <div className="Vlt-card Vlt-card--border">
      <div className="Vlt-grid">
        <div className={clsx("Vlt-col", "Vlt-center", mStyles.borderRight)}>
          <ApplicationSummary 
            apiKey={apiKey} 
            applications={apiKey?.applications} 
          />
        </div>
        <div className="Vlt-col Vlt-center">
          <ChannelSummary 
            apiKey={apiKey}
            channels={apiKey?.channels} 
          />
        </div>
      </div>
    </div>
  )
}
export default SummaryCard;
