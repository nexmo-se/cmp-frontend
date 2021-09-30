import ApiKey from "entities/apiKey";

import useApiKey from "hooks/apiKey";
import useError from "hooks/error";
import { useState } from "react";

import LoadingModal from "components/LoadingModal";
import ButtonIcon from "components/ButtonIcon";

interface DeleteButtonProps {
  apiKey: ApiKey;
}

function DeleteButton ({ apiKey }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { remove } = useApiKey();
  const { throwError } = useError();

  async function handleClick () {
    if (!apiKey.id) return;
    try {
      setIsDeleting(true);
      await remove(apiKey.id);
    } catch(err) {
      throwError(err as Error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <ButtonIcon 
        icon="Vlt-icon-bin"
        type="destructive"
        onClick={handleClick}
      />
      <LoadingModal
        label="Deleting API key"
        visible={isDeleting}
      />
    </>
  )
}
export default DeleteButton