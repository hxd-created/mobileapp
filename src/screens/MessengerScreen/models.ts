export enum DialogType {
  P2P = "P2P",
  GROUP = "GROUP",
  CHANNEL = "CHANNEL",
  SECRET = "SECRET",
}

export enum DialogRole {
  OWNER = "OWNER",
  USER = "USER",
  ADMIN = "ADMIN",
  READONLY = "READONLY",
}

export interface Dialog {
  id: string
  type: DialogType
  title: string
  lastMessage: MessageGeneric
  unreadCount: number
  participants: DialogParticipant[]
  participantsCount: number
  myRole: DialogRole
}

export interface DialogParticipant {
  objectKind: string
  objectID: string
  object: DialogParticipantObject
  role: DialogRole
}

export interface DialogParticipantObject {
  displayName: string
  avatar: Photo
}

export interface Photo {
  id: string
  previewURL: string
}

export type MessageGeneric = Message | MessageInit | MessageJoin;

export interface Message {
  __typename: string
  id: string
  replyToMessage: Message
  senderKind: string
  senderID: string
  sentAt: number
  text: string
  attachments: MessageAttachment[]
}

export interface MessageInit {
  __typename: string
  id: string
  sentAt: number
}

export interface MessageJoin {
  __typename: string
  id: string
  sentAt: number
  participant: DialogParticipant
}

export interface MessageAttachment {}
