import Campaign from "entities/campaign";

import useError from "hooks/error";
import { useSingleCampaign } from "hooks/single-campaign";
import { useState } from "react";
import { useModals } from "../Modals";

import ButtonIcon from "components/ButtonIcon";
import LoadingModal from "components/LoadingModal";

interface DeleteButtonProps {
  campaign: Campaign;
}

function DeleteButton ({ campaign }: DeleteButtonProps) {
  const [ loading, setLoading ] = useState(false);
  const { throwError } = useError();
  const { showLoading, hideLoading } = useModals();
  const { remove } = useSingleCampaign({ id: campaign.id });

  async function handleClick () {
    try {
      showLoading({ label: "Deleting campaign" });
      await remove();
    } catch(err) {
      throwError(err);
    } finally {
      hideLoading();
    }
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-bin"
      type="destructive"
      onClick={handleClick}
    />
  )
}
export default DeleteButton