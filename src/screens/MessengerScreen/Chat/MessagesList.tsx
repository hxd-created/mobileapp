import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';

import { Dialog, DialogParticipant, Message, MessageGeneric, MessageQueueItem } from '../models';
import MessageComponent from './Message';
import SendMessage from './SendMessage';


export interface ComponentProps {
  messages: MessageGeneric[]
  dialog: Dialog

  senderKind: string
  senderID: string

  sendQueue: MessageGeneric[]
  removeMessageFromQueue: (tempID: string) => void
}

export default class MessagesList extends PureComponent<ComponentProps> {

  dialogParticipants: Map<string, DialogParticipant> = new Map();

  constructor(props: ComponentProps) {
    super(props);
    this.normalizeParticipants(props.dialog.participants);
  }

  normalizeParticipants = (participants: DialogParticipant[]) => {
    for (const participant of participants) {
      const key = `${participant.objectKind}-${participant.objectID}`;
      this.dialogParticipants.set(key, participant)
    }
  }

  _keyExtractor = (item: MessageGeneric, index) => item.id;

  _renderItem = ({item} : {item: MessageGeneric}) => {
    if (item.__typename === "Message") {
      return <MessageComponent
        message={item as Message}
        getParticipant={this.getParticipant}
        dialogType={this.props.dialog.type}
        isMyMessage={(item as Message).senderKind === this.props.senderKind && (item as Message).senderID === this.props.senderID}
      />
    }
    
    if (item.__typename === "MessageQueueItem") {
      return (<SendMessage
        message={item as MessageQueueItem}
        getParticipant={this.getParticipant}
        dialogType={this.props.dialog.type}
      />);
    }

    return null;
  }

  getParticipant = (kind: string, id: string): DialogParticipant => {
    const key = `${kind}-${id}`;
    const val = this.dialogParticipants.get(key);

    return val!;
  }

  render() {
    return <FlatList
      inverted
      data={[...this.props.sendQueue, ...this.props.messages]}
      extraData={this.state}
      keyExtractor={this._keyExtractor}
      renderItem={this._renderItem}
    />
  }

}

