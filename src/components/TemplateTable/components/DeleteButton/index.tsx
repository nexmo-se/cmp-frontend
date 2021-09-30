import Template from "entities/template";

import useTemplate from "hooks/template";
import useError from "hooks/error";
import { useState } from "react";

import LoadingModal from "components/LoadingModal";
import ButtonIcon from "components/ButtonIcon";

interface DeleteButtonProps {
  template: Template;
}

function DeleteButton ({ template }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { throwError } = useError();
  const { remove } = useTemplate();

  async function handleClick () {
    try{ 
      setIsDeleting(true);
      await remove({ id: template.id });
    } catch (err: unknown) {
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
        label="Deleting Template"
        visible={isDeleting}
      />
    </>
  )
}
export default DeleteButton