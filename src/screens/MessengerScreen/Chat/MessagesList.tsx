import React, { PureComponent } from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components';

import { Dialog, DialogParticipant, Message } from '../models';
import MessageComponent from './Message';


export interface ComponentProps {
  messages: Message[]
  dialog: Dialog

  senderKind: string
  senderID: string
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

  _keyExtractor = (item: Message, index) => item.id;

  _renderItem = ({item} : {item: Message}) => {
    return <MessageComponent
      message={item}
      getParticipant={this.getParticipant}
      dialogType={this.props.dialog.type}
      isMyMessage={item.senderKind === this.props.senderKind && item.senderID === this.props.senderID}
    />
  }

  getParticipant = (kind: string, id: string): DialogParticipant => {
    const key = `${kind}-${id}`;
    const val = this.dialogParticipants.get(key);

    return val!;
  }

  render() {
    return <FlatList
      inverted
      data={this.props.messages}
      extraData={this.state}
      keyExtractor={this._keyExtractor}
      renderItem={this._renderItem}
    />
  }

}

