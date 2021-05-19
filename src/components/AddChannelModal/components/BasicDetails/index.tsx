import Channel from "entities/channel";
import lodash from "lodash";

import { useEffect } from "react";
import { useForm } from "../Form";

import Dropdown from "components/Dropdown";
import TextInput from "components/TextInput";

interface BasicDetailsProps {
  disabledChannels: string[];
}

function BasicDetails ({ disabledChannels }: BasicDetailsProps) {
  const { name, channel, setName, setChannel } = useForm();

  useEffect(
    () => {
      const [availableChannel] = lodash.difference(Channel.acceptedChannel, disabledChannels ?? []);

      if (availableChannel) {
        setChannel(availableChannel);
      }
    },
    [disabledChannels, setChannel]
  )

  return (
    <>
      <TextInput
        label="Name"
        value={name}
        setValue={setName}
      />
      <div className="Vlt-grid Vlt-grid--narrow">
        <div className="Vlt-col Vlt-col--A">
          <Dropdown
            label="Channel"
            value={channel}
            setValue={setChannel}
          >
            <option value="">--- Please select ---</option>
            {
              Channel.acceptedChannel.map(
                (channel) => (
                  <option
                    value={channel}
                    disabled={
                      (disabledChannels)
                      ? disabledChannels.includes(channel)
                      : false
                    }
                  >
                    {Channel.channelMapping[channel]}
                  </option>
                )
              )
            }
          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default BasicDetails;
