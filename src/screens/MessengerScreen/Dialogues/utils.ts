import { Dialog, DialogType } from "../models";

export function getDialogueTitle(currentUserID: string, dialog: Dialog): string {
  if (dialog.type == DialogType.P2P) {
    return "p2p"
  }
  return dialog.title;
}