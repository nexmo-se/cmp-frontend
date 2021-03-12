// @flow
import React from "react";
import lodash from "lodash";

import Channel from "entities/channel";
import APIKey from "entities/apiKey";

import useChannel from "hooks/channel";
import reducer, { initialState } from "components/AddChannelModal/reducer";
import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import Modal from "components/Modal";
import ModalContent from "components/Modal/ModalContent";
import ModalHeader from "components/Modal/ModalHeader";
import ModalFooter from "components/Modal/ModalFooter";

import LoadingButton from "components/LoadingButton";
import Button from "components/Button";
import TextInput from "components/TextInput";
import Dropdown from "components/Dropdown";
import NumberInput from "components/NumberInput";
import APIKeyDropdown from "components/APIKeyDropdown";
import ApplicationDropdown from "components/ApplicationDropdown";

interface AddChannelModalProps {
  disableAPIKey?: boolean;
  disabledChannels?: string[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refreshToken?: string,
  apiKey?: APIKey;
  onAdded?: () => void;
}

function AddChannelModal (props: AddChannelModalProps) {
  const {
    disabledChannels,
    visible,
    setVisible,
    onAdded,
    refreshToken,
    apiKey,
    disableAPIKey
  } = props;

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [isAdding, setIsAdding] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mChannel = useChannel(token);

  function handleCancel () {
    setVisible(false);
  }

  function handleValueChange (valueName, value) {
    dispatch({ type: "CHANGE_VALUE", valueName, value });
  }

  function handleChannelChange (value) {
    handleValueChange("channel", value)
  }

  function handleNameChange (value) {
    handleValueChange("name", value)
  }

  function handleSenderIdChange (value) {
    handleValueChange("senderId", value)
  }

  function handleTPSChange (value) {
    handleValueChange("tps", value)
  }

  function handleAPIKeyChange (value) {
    handleValueChange("apiKey", value)
  }

  function handleApplicationChange (value) {
    handleValueChange("application", value)
  }

  async function handleAddNew (e) {
    e.preventDefault();
    setIsAdding(true);
    try {
      if (!state.apiKey) throw new Error("You need to select API Key");

      const ch = new Channel({
        name: state.name,
        channel: state.channel,
        smsUseSignature: state.smsUseSignature,
        senderId: state.senderId,
        tps: state.tps,
        apiKey: state.apiKey,
        application: state.application
      });

      await mChannel.create(ch);
      dispatch({ type: "CLEAR_INPUT" })
      if (onAdded) onAdded()
    } catch(err) {
      throwError(err);
    } finally {
      setIsAdding(false);
      setVisible(false);
    }
  }

  React.useEffect(
    () => {
      const [availableChannel] = lodash.difference(Channel.acceptedChannel, disabledChannels ?? []);

      if (availableChannel) {
        dispatch({
          type: "CHANGE_VALUE",
          valueName: "channel",
          value: availableChannel
        });
      }
    },
    [disabledChannels]
  )

  React.useEffect(
    () => {
      handleValueChange("apiKey", apiKey)
    },
    [apiKey]
  );

  React.useEffect(
    () => {
      dispatch({ type: "CHECK_CLEAN" });
    },
    [
      state.name, 
      state.channel, 
      state.senderId, 
      state.apiKey, 
      state.channel,
      state.application
    ]
  )

  return (
    <form>
      <Modal visible={visible}>
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Channel</h4>
        </ModalHeader>
        <ModalContent>
          <TextInput
            label="Name"
            value={state.name}
            setValue={handleNameChange}
          />
          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <Dropdown
                label="Channel"
                value={state.channel}
                setValue={handleChannelChange}
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

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="Sender ID" 
                value={state.senderId} 
                setValue={handleSenderIdChange} 
                disabled={!state.channel}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <NumberInput 
                label="throughput per second (TPS)" 
                value={state.tps} 
                setValue={handleTPSChange}
                disabled={!state.channel}
              />
            </div>
          </div>

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <APIKeyDropdown 
                label="API Key" 
                value={state.apiKey} 
                onChange={handleAPIKeyChange} 
                disabled={!state.channel || disableAPIKey}
                refreshToken={refreshToken}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <ApplicationDropdown 
                label="Application" 
                value={state.application} 
                onChange={handleApplicationChange} 
                disabled={state.channel === "sms" || !state.channel}
                refreshToken={refreshToken}
              />
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button 
            type="tertiary" 
            onClick={handleCancel} 
            disabled={isAdding}
          >
            Cancel
          </Button>
          <LoadingButton 
            loading={isAdding}
            disabled={!state.isClean}
            onClick={handleAddNew} 
            buttonType="submit"
          >
            Add New
          </LoadingButton>
        </ModalFooter>
      </Modal>
    </form>
  )
}
export default AddChannelModal;