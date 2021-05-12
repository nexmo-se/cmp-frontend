import { useForm } from "../Form";

import TextInput from "components/TextInput";
import ChannelDropdown from "components/ChannelDropdown";
import TemplateType from "components/TemplateType";
import LoadingButton from "components/LoadingButton";

function FormContent () {
  const {
    name,
    content,
    setContent,
    channel,
    mediaType,
    setName,
    setChannel,
    setMediaType,
    isSubmitting,
    isClean
  } = useForm();

  return (
    <div className="Vlt-grid">
      <div className="Vlt-col Vlt-grid__separator">
        <TextInput 
          label="Name" 
          value={name}
          setValue={setName}
        />
      </div>
      <div className="Vlt-col Vlt-grid__separator">
        <ChannelDropdown 
          label="Channel"
          value={channel}
          disabled
        />
      </div>
      <div className="Vlt-grid__separator" />
      <div className="Vlt-col Vlt-grid__separator">
        {
          channel && (
            <TemplateType 
              mediaType={mediaType}
              channel={channel} 
              onMediaTypeChange={setMediaType}
              onContentChange={setContent}
              content={content}
            />
          )
        }
      </div>
      <div className="Vlt-col Vlt-right">
        <LoadingButton
          disabled={!isClean}
          loading={isSubmitting}
          buttonType="submit"
        >
          Edit
        </LoadingButton>
      </div>
    </div>
  )
}

export default FormContent;
