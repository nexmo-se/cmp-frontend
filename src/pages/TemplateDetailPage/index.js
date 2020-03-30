import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import Template from "entities/template";
import useUser from "hooks/user";
import useError from "hooks/error";
import useTemplate from "hooks/template";

import EditCard from "./EditCard";

import TemplateInformationCard from "components/TemplateInformationCard";
import FullPageSpinner from "components/FullPageSpinner";
import PageHeader from "components/PageHeader";
import TextInput from "components/TextInput";
import TextArea from "components/TextArea";
import ChannelDropdown from "components/ChannelDropdown";

function TemplateDetailPage(){
  const [ template, setTemplate ] = React.useState();
  const [ isFetching, setIsFetching ] = React.useState(true);
  const [ refreshToken, setRefreshToken ] = React.useState(uuid());
  const { templateId } = useParams();
  const mUser = useUser();
  const mError = useError();
  const mTemplate = useTemplate(mUser.token);

  async function fetchData(){
    try{
      setIsFetching(true);
      const template = await mTemplate.retrieve(Template.fromID(templateId));
      setTemplate(template);
    }catch(err){
      mError.throwError(err);
    }finally{
      setIsFetching(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [ templateId, refreshToken ])

  if(isFetching) return <FullPageSpinner />
  return (
    <React.Fragment>
      <PageHeader title="TEMPLATE" name={template?.name} />
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-col--2of3">
          <EditCard template={template} />
        </div>
        <div className="Vlt-col">
          <TemplateInformationCard />
        </div>
      </div>
    </React.Fragment>
  );
}
export default TemplateDetailPage;
