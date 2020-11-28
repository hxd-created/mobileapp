import React, { Component, useState, useContext, useEffect, useRef } from 'react';
import { ReactRelayContext } from 'react-relay';
import * as FileSystem from 'expo-file-system';

import { uploadPhotoMutationAsync } from '../../../mutations/UploadPhoto';
import {
  DialogParticipant,
  DialogType,
  Message,
  MessageQueueItem,
  MessageQueueItemAttachment,
  Photo,
} from '../models';
import MessageComponent from './Message';
import { sendMessageAsync } from '../../../mutations/messenger/SendMessage';


export interface ComponentProps {
  message: MessageQueueItem

  getParticipant: (kind: string, id: string) => DialogParticipant
  dialogType: DialogType

  environment?: any
}


class SendMessage extends Component<ComponentProps> {

  constructor(props) {
    super(props);
    this.state = {
      message: this.convertQueueItemToMessage(props.message),
    }
  }

  componentDidMount() {
    this.sendMsg();
  }

  convertQueueItemToMessage(item: MessageQueueItem): Message {
    return {
      __typename: "Message",
      id: item.id,
      dialogID: item.dialogID,
      replyToMessage: null,
      senderKind: "User",
      senderID: "0",
      sentAt: 0,
      text: item.text,
      sending: true,
      attachments: item.attachments.map((asset: MessageQueueItemAttachment): Photo => ({  // can receive not only photos!
        __typename: "Photo",
        id: `temp-id-asset-${asset.id}`,
        previewURL: asset.uri,
        mediumURL: asset.uri,
        width: asset.width,
        height: asset.height,
  
        uploading: true,  // set default state as uploading and change in when done
        filename: asset.filename,
      })),
    }
  }

  uploadPhotos = async (): string[] => {
    let attachedPhotoIDs: string[] = [];
    if (this.state.message.attachments.length === 0) return attachedPhotoIDs;

    for (const asset of this.state.message.attachments) {
      const assetURI = (asset as Photo).previewURL;  // in message box we set preview as original
      let data = await FileSystem.readAsStringAsync(assetURI, {
        encoding: FileSystem.EncodingType.Base64,
      });
      data = "data:image/png;base64,"+data;
      let rsp;
      try {
        rsp = await uploadPhotoMutationAsync(this.props.environment, 0, (asset as Photo).filename, "", data, null);
      } catch (error) {
        console.log('error while uploading', error)
        continue;
      }
      this.setState({
        message: {
          ...this.state.message,
          attachments: this.state.message.attachments.map(mapAsset => {
            if ((mapAsset as Photo).id !== (asset as Photo).id) {
              return mapAsset;
            }
            return {...mapAsset, uploading: false};
          }),
        }
      });
      attachedPhotoIDs.push(rsp.realID)
    }
    console.log('uploading done');
    return attachedPhotoIDs;
  }

  sendMsg = async () => {
    const attachedPhotosIDs = await this.uploadPhotos();
    // TODO: catch errors and handle it
    const rsp = await sendMessageAsync(this.props.environment, {
      dialogID: this.state.message.dialogID,
      text: this.state.message.text,
      communityID: null,
      replyToID: null,
      attachments: attachedPhotosIDs.map(realID => ({
        ObjectKind: "photo",
        ObjectID: `${realID}`,
      }))
    });
    console.log('dialogsResponse', rsp)
  }

  render() {
    return (<MessageComponent
      message={this.state.message}
      getParticipant={this.props.getParticipant}
      dialogType={this.props.dialogType}
      isMyMessage={true}
    />);
  }
}

export default (props: ComponentProps) => {
  const { environment } = useContext(ReactRelayContext);
  
  return (<SendMessage {...props} environment={environment} />)
}
