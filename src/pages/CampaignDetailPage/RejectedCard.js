import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import useUser from "hooks/user";
import useCampaign from "hooks/campaign";
import useError from "hooks/error";
import VoltaIcon from "components/VoltaIcon";
import StatsNumber from "pages/CampaignDetailPage/StatsNumber";

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

function RejectedCard({ campaign }){
  const [ report, setReport ] = React.useState(null);
  const [ isFetching, setIsFetching ] = React.useState(true);
  const classes = useStyles();
  const mUser = useUser();
  const mError = useError();
  const mCampaign = useCampaign(mUser.token);

  async function fetchData(){
    try{
      setIsFetching(true);
      const report = await mCampaign.summaryReport(campaign);
      setReport(report);
    }catch(err){
      mError.throwError(err);
    }finally{
      setIsFetching(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [ campaign ]);

  return (
    <div 
      className={clsx(
        "Vlt-card", 
        "Vlt-card--clickable",
        "Vlt-gradient--pink-to-peach", 
        classes.normalCursor,
        classes.overflowHidden
      )}
    >
      <div className={clsx("Vlt-card__content", classes.content)}>
        <VoltaIcon className={clsx("Vlt-white", classes.largeIcon)} icon="Vlt-icon-cross-circle" />
        <div className={classes.dataContainer}>
          <p className={clsx("Vlt-white", classes.noMarginPadding)}>REJECTED</p>
          <h4 className={clsx("Vlt-white", classes.noMarginPadding)}>
            <StatsNumber left={report?.rejected} right={report?.totalRecord} />
          </h4>
        </div>
      </div>
    </div>
  )
}
export default RejectedCard;