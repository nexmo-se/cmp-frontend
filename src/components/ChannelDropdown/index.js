// @flow
import React from "react";
import Channel from "entities/channel";

import useChannel from "hooks/channel";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Dropdown from "components/Dropdown";

type Props = {
  refreshToken:string,
  label:string,
  value:string,
  onChange:Function
}

function ChannelDropdown({ refreshToken, label, value, onChange, ...props }:Props){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mChannel = useChannel(token);

  function handleChange(channelId){
    if(onChange){
      const channel = new Channel({ id: channelId });
      onChange(channel);
    }
  }

  React.useEffect(() => {
    mChannel.list().catch((err) => throwError(err))
  }, [ refreshToken ])

  return(
    <Dropdown 
      {...props}
      label={label} 
      value={value} 
      setValue={handleChange}
    >
      <option>--- Please Select ---</option>
      {mChannel.data.map((channel) => {
        return (
          <option value={channel.id} key={channel.id}>
            {channel.name}
          </option>
        )
      })}
    </Dropdown>
  )
}
export default ChannelDropdown