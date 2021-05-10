import React from "react";
import Channel from "entities/channel";

import useChannel from "hooks/channel";
import useUser from "hooks/user";
import useError from "hooks/error";

import Dropdown from "components/Dropdown";

type ChangeReturnValue = void | Promise<void>;
interface ChannelDropdownProps {
  label: string;
  value?: Channel;
  onChange?: (value: Channel) => ChangeReturnValue;
}

function ChannelDropdown ({ refreshToken, label, value, onChange, ...props }: ChannelDropdownProps) {
  const mUser = useUser();
  const mError = useError();
  const { channels } = useChannel();

  function handleChange (channelId) {
    if(onChange) onChange(new Channel({ id: channelId }));
  }

  return (
    <Dropdown 
      {...props}
      label={label} 
      value={value?.id ?? ""} 
      setValue={handleChange}
    >
      <option value="">--- Please Select ---</option>
      {channels.map(
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