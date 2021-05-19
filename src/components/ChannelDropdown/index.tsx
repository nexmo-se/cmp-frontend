import Channel from "entities/channel";
import lodash from "lodash";
import useChannel from "hooks/channel";
import { DropdownProps } from "components/Dropdown";

import Dropdown from "components/Dropdown";

type ChangeReturnValue = void | Promise<void>;

interface MainProps {
  label: string;
  value?: Channel;
  onChange?: (value: Channel) => ChangeReturnValue;
}

type OmitDropdownProps = Omit<DropdownProps, "value" | "children">;
type ChannelDropdownProps = MainProps & OmitDropdownProps;

function ChannelDropdown ({ label, value, onChange, ...props }: ChannelDropdownProps) {
  const { channels } = useChannel();

  function handleChange (channelId: string) {
    if(onChange) {
      const channel = lodash(channels).find({ id: channelId });
      if (channel) onChange(channel);
    }
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