import { useReportData } from "../SummaryReport";
import { useEffect, useState } from "react";

import StatsCard from "../StatsCard";

function TimeTakeCard () {
  const [duration, setDuration] = useState("-");
  const [durationString, setDurationString] = useState("");
  const { campaign } = useReportData();

  useEffect(
    () => {
      if (!campaign) return;
      if (!campaign.actualDuration) return;

      let duration = (campaign.actualDuration / 1000);
      let durationString = "seconds";
      if(duration > 60){
        duration = duration / 60;
        durationString = "minutes";
        if(duration > 60){
          duration = duration / 60;
          durationString = "hours";
          if(duration > 24){
            duration = duration / 24;
            durationString = "days";
            if(duration > 7 ){
              duration = duration / 7;
              durationString = "weeks";
            }
          }
        }
      }
      setDuration(duration?.toFixed(2));
      setDurationString(durationString);
    },
    [campaign]
  )

  return (
    <StatsCard
      iconName="Vlt-icon-clock"
      backgroundColor="Vlt-gradient--gumdrops3"
      label="TIME TAKEN"
      value={`${duration} ${durationString}`}
      visible
    />
  )
}

export default TimeTakeCard;
