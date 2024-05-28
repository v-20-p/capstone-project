import * as FileSystem from 'expo-file-system';

export async function prepareDirectory(directoryPath) {
  const targetDirectory = await FileSystem.getInfoAsync(directoryPath);
  if (!targetDirectory.exists) {
    try {
      await FileSystem.makeDirectoryAsync(directoryPath, {
        intermediates: true,
      });
    } catch (error) {
      console.error('Error while making directory', error);
    }
  }
}

export function getFileName(fileUri) {
  return fileUri.slice(fileUri.lastIndexOf('/') + 1);
}