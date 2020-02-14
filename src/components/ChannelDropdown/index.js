import React from "react";

import useChannel from "hooks/channel";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Dropdown from "components/Dropdown";

function ChannelDropdown({ label, value, setValue, disabled }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mChannel = useChannel(token);

  React.useEffect(() => {
    mChannel.list().catch((err) => throwError(err))
  }, [])

  return(
    <Dropdown label={label} value={value} setValue={setValue} disabled={disabled}>
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