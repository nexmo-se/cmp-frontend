import Channel from "entities/channel";

import useChannel from "hooks/channel";
import useError from "hooks/error";
import { useState } from "react";

import LoadingModal from "components/LoadingModal";
import ButtonIcon from "components/ButtonIcon";

interface DeleteButtonProps {
  channel: Channel;
}

function DeleteButton ({ channel }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { throwError } = useError()
  const { remove } = useChannel();

  async function handleClick () {
    if (!channel.id) return;
    
    try {
      setIsDeleting(true);
      await remove({ id: channel.id })
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
        label="Deleting Channel"
        visible={isDeleting}
      />
    </>
  )
}
export default DeleteButton