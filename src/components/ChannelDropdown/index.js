// @flow
import React from "react";
import Channel from "entities/channel";

import useChannel from "hooks/channel";
import useUser from "hooks/user";
import useError from "hooks/error";

import Dropdown from "components/Dropdown";

interface ChannelDropdownProps {
  refreshToken?: string;
  label: string;
  value?: Channel;
  onChange?: ((value: Channel) => void) | ((value: Channel) => Promise<void>);
}

function ChannelDropdown ({ refreshToken, label, value, onChange, ...props }: ChannelDropdownProps) {
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
      <option value="">--- Please Select ---</option>
      {mChannel.data.map(
        (channel) => (
          <option
            value={channel.id}
            key={channel.id}
          >
            {channel.name}
          </option>
        )
      )}
      
    </Dropdown>
  )
}
export default ChannelDropdown