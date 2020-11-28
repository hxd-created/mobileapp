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
  __typename
  id: string
  previewURL: string
  mediumURL: string
  width: number
  height: number

  // next fields are using only while message sending
  uploading?: boolean
  filename?: string
}

export type MessageGeneric = Message | MessageInit | MessageJoin;

export interface Message {
  __typename: string
  id: string
  replyToMessage: Message | null
  senderKind: string
  senderID: string
  sentAt: number
  text: string
  attachments: MessageAttachment[]

  // next fields are using only while message sending
  sending?: boolean
  dialogID?: string
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

export interface MessageQueueItem {
  __typename: string
  id: string
  dialogID: string
  text: string
  attachments: any[]
}

export interface MessageQueueItemAttachment {
  id: string                // Internal ID that represents an asset
  filename: string          // Filename of the asset
  uri: string               // URI that points to the asset	assets://* (iOS), file://* (Android
  mediaType: string         // Media type	MediaType.audio, MediaType.photo, MediaType.video, MediaType.unknow
  width: number             // Width of the image or video
  height: number            // Height of the image or video
  creationTime: number      // File creation timestamp
  modificationTime: number  // Last modification timestamp
  duration: number          // Duration of the video or audio asset in seconds
}

export type MessageAttachment = Photo | {__typename: string}
