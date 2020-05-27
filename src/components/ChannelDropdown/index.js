// @flow
import React from "react";

import useChannel from "hooks/channel";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Dropdown from "components/Dropdown";

type Props = {
  refreshToken:string,
  label:string,
  value:string,
  setValue:Function
}

function ChannelDropdown({ refreshToken, label, value, setValue, ...props }:Props){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mChannel = useChannel(token);

  React.useEffect(() => {
    mChannel.list().catch((err) => throwError(err))
  }, [ refreshToken ])

  return(
    <Dropdown 
      {...props}
      label={label} 
      value={value} 
      setValue={setValue} 
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