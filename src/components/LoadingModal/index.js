// @flow
import React from "react";
import { makeStyles } from "@material-ui/styles";

import Modal from "components/Modal";
import ModalContent from "components/Modal/ModalContent";
import Spinner from "components/Spinner";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex", 
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 0
  }
}))

type Props = {
  visible:boolean,
  label:string
}

function LoadingModal({ visible, label }:Props){
  const mStyles = useStyles();

  return (
    <Modal size="small" visible={visible}>
      <ModalContent className={mStyles.content}>
        <Spinner white={false} />
        <h4>{label}</h4>
      </ModalContent>
    </Modal>
  )
}
export default LoadingModal;