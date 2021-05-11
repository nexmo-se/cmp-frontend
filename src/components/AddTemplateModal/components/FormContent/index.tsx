import Channel from "entities/channel";

import { useSingleChannel } from "hooks/single-channel";
import { useForm } from "../Form";

import TextInput from "components/TextInput";
import ChannelDropdown from "components/ChannelDropdown";
import TemplateType from "components/TemplateType";
import FullPageSpinner from "components/FullPageSpinner";

function FormContent () {
  const {
    channel,
    name,
    mediaType,
    content,
    setName,
    setChannel,
    setMediaType,
    setContent
  } = useForm();
  const { channel: currentChannel } = useSingleChannel({ id: channel?.id });

  return (
    <>
      <TextInput
        label="Name"
        value={name}
        setValue={setName}
      />
      <ChannelDropdown 
        label="Channel" 
        value={channel} 
        onChange={setChannel} 
      />
      {
        currentChannel !== undefined? (
          <TemplateType 
            channel={currentChannel} 
            mediaType={mediaType}
            onMediaTypeChange={setMediaType}
            onContentChange={setContent}
            content={content}
          />
        ): (currentChannel === undefined && channel !== undefined)? (
          <FullPageSpinner />
        ): null
      }
    </>
  )
}

export default FormContent;
