import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import useCampaign from "hooks/campaign";
import VoltaIcon from "components/VoltaIcon";
import StatsNumber from "pages/CampaignDetailPage/StatsNumber";
import { UserContext } from "contexts/user";

const useStyles = makeStyles(() => ({
  normalCursor: { cursor: "unset" },
  overflowHidden: { overflow: "hidden" },
  noMarginPadding: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  }, 
  content: { 
    display: "flex",
    alignItems: "center",
  },
  largeIcon: {
    width: 64,
    height: 64,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 16
  }
}))

function DeliveryCard({ campaign }){
  const [ report, setReport ] = React.useState(null);
  const [ isFetching, setIsFetching ] = React.useState(true);
  const { token } = React.useContext(UserContext);
  const classes = useStyles();
  const mCampaign = useCampaign(token);

  async function fetchData(){
    try{
      setIsFetching(true);
      const report = await mCampaign.summaryReport(campaign);
      setReport(report);
    }finally{
      setIsFetching(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [ campaign ])

  return (
    <div 
      className={clsx(
        "Vlt-card", 
        "Vlt-card--clickable",
        "Vlt-gradient--blue-to-purple", 
        classes.normalCursor,
        classes.overflowHidden
      )}
    >
      <div className={clsx("Vlt-card__content", classes.content)}>
        <VoltaIcon className={clsx("Vlt-white", classes.largeIcon)} icon="Vlt-icon-check-double-bold" />
        <div className={classes.dataContainer}>
          <p className={clsx("Vlt-white", classes.noMarginPadding)}>DELIVERED</p>
          <h4 className={clsx("Vlt-white", classes.noMarginPadding)}>
            <StatsNumber left={report?.delivered} right={report?.totalRecord} />
          </h4>
        </div>
      </div>
    </div>
  )
}
export default DeliveryCard;