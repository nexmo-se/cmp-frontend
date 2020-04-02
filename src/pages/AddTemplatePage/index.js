import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { useLocation, useHistory } from "react-router-dom";

import ChannelSelection from "./ChannelSelection";
import PageHeader from "components/PageHeader";

import Steps from "components/Steps";
import StepsContainer from "components/Steps/StepsContainer";
import { Route } from "react-router-dom";

const useStyles = makeStyles(() => ({
  selectionContainer: {
    marginTop: 48
  }
}))

function AddTemplatePage(){
  const [ selectedStep, setSelectedStep ] = React.useState(0);
  const mLocation = useLocation();
  const mHistory = useHistory();
  const mStyles = useStyles();

  React.useEffect(() => {
    if(mLocation.pathname.includes("/templates/add_new/channel")) setSelectedStep(1);
    else if(mLocation.pathname.includes("/templates/add_new/template")) setSelectedStep(2);
    else if(mLocation.pathname.includes("/templates/add_new/summary")) setSelectedStep(3);
    else if(mLocation.pathname.includes("/templates/add_new/done")) setSelectedStep(4);
  }, [ mLocation.pathname ]);

  React.useEffect(() => {
    mHistory.push("/templates/add_new/channel")
  }, [ mHistory ])

  return (
    <React.Fragment>
      <PageHeader title="Template" name="Add New Template" />
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-grid__separator Vlt-center">
          <StepsContainer>
            <Steps 
              to="/templates/add_new/channel"
              done={selectedStep > 1}
              selected={selectedStep === 1}
            >
              Channel
            </Steps>
            <Steps 
              to="/templates/add_new/template"
              done={selectedStep > 2}
              selected={selectedStep === 2}
            >
              Template
            </Steps>
            <Steps 
              to="/templates/add_new/summary"
              done={selectedStep > 3}
              selected={selectedStep === 3}
            >
              Summary
            </Steps>
            <Steps 
              to="/templates/add_new/done"
              selected={selectedStep === 4}
            >
              Done
            </Steps>
          </StepsContainer>
        </div>
        <div className={clsx(
          "Vlt-col",
          mStyles.selectionContainer
        )}>
          <Route path="/templates/add_new/channel" component={ChannelSelection} />
        </div>
      </div>
    </React.Fragment>
  )
}
export default AddTemplatePage;