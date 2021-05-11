import { useState } from "react";

import ButtonIcon from "components/ButtonIcon";
import EditAPIKeyModal from "components/EditAPIKeyModal";

interface EditButtonProps {
  className?: string;
  apiKey: ApiKey;
}

function EditButton ({ className, apiKey }: EditButtonProps) {
  const [visible, setVisible] = useState(false);

  function handleClick () {
    setVisible(true);
  }

  return (
    <>
      <ButtonIcon 
        className={className}
        icon="Vlt-icon-edit" 
        onClick={handleClick} 
      />
      <EditAPIKeyModal 
        visible={visible}
        setVisible={setVisible}
        apiKey={apiKey}
      />
    </>
  );
}

export default EditButton;