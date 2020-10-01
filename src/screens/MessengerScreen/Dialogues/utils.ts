import { Dialog, DialogParticipant, DialogType, Message, MessageGeneric, Photo } from "../models";

export function getDialogueTitle(currentObjectKind: string, currentObjectID: string, dialog: Dialog): string {
  if (dialog.type == DialogType.P2P) {
    const mirrorParticipant = getP2PParticipant(currentObjectKind, currentObjectID, dialog.participants)
    return mirrorParticipant.object.displayName
  }
  return dialog.title;
}

export function getDialogueAvatar(currentObjectKind: string, currentObjectID: string, dialog: Dialog): Photo | null {
  if (dialog.type == DialogType.P2P) {
    const mirrorParticipant = getP2PParticipant(currentObjectKind, currentObjectID, dialog.participants)
    if (mirrorParticipant === null) {
      return null
    }
    return mirrorParticipant.object.avatar
  }
  return null;
}

export function getP2PParticipant(currentObjectKind: string, currentObjectID: string, participants: DialogParticipant[]): DialogParticipant | null{
  for (const participant of participants) {
    if (participant.objectKind === currentObjectKind && participant.objectID === currentObjectID) {
      continue
    }
    return participant
  }
  return null
}

export function getMessagePreviewText(message: MessageGeneric): string {
  if (message.__typename === "Message") {
    const msg: Message = message as Message
    return msg.text
  }
  return "unsupported type yet"
}

export function getMessageSender(message: Message, participants: DialogParticipant[]): DialogParticipant | null {
  const senderKind = message.senderKind;
  const senderID = message.senderID;
  for (const participant of participants) {
    if (participant.objectKind === senderKind && participant.objectID === senderID) {
      return participant
    }
  }
  return null
}