// @flow
import React from "react";
import Channel from "entities/channel";

import useChannel from "hooks/channel";
import useUser from "hooks/user";
import useError from "hooks/error";

import Dropdown from "components/Dropdown";

type Props = {
  refreshToken?:string,
  label:string,
  value?:Channel,
  onChange?:Function
}

function ChannelDropdown({ refreshToken, label, value, onChange, ...props }:Props){
  const mUser = useUser();
  const mError = useError();
  const mChannel = useChannel(mUser.token);

  function handleChange(channelId){
    if(onChange) onChange(new Channel({ id: channelId }));
  }

  React.useEffect(() => {
    mChannel.list().catch((err) => mError.throwError(err))
  }, [ refreshToken ])

  return(
    <Dropdown 
      {...props}
      label={label} 
      value={value?.id ?? ""} 
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