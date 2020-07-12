import * as Linking from 'expo-linking';

export function openURL(url: string) {
  Linking.openURL(url);
}
