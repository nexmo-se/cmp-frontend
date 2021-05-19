import Application from "entities/application";

import useError from "hooks/error";
import useApplication from "hooks/application";
import { useState } from "react";

import LoadingModal from "components/LoadingModal";
import ButtonIcon from "components/ButtonIcon";

interface DeleteButtonProps {
  application: Application;
}

function DeleteButton ({ application }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { remove } = useApplication();
  const { throwError } = useError();

  async function handleClick () {
    if (!application.id) return;
    
    try {
      setIsDeleting(true);
      await remove({ id: application.id })
    } catch (err) {
      throwError(err);
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
        label="Deleting Application"
        visible={isDeleting}
      />
    </>
  )
}
export default DeleteButton