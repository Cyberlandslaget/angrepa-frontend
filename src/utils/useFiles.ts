import { useAtom } from 'jotai';
import {
  currentFiles as currentFilesAtom,
  currentlySelectedFile,
} from 'utils/atoms';
import generateTar from './tar/generateTar';
import parseTar from './tar/parseTar';
import { File } from 'utils/types';
import { DEFAULT_CONFIG_JSON } from './constants';

export default function useFiles() {
  const [currentFiles, setCurrentFiles] = useAtom(currentFilesAtom);
  const [selectedFile, setSelectedFile] = useAtom(currentlySelectedFile);

  const addFile = (file: File) => {
    setCurrentFiles((cf) => [...cf, file]);
  };

  const removeFile = (filename: string | File) => {
    filename = typeof filename === 'string' ? filename : filename.name;
    setCurrentFiles(currentFiles.filter((file) => file.name !== filename));
  };

  const clearFiles = () => {
    setCurrentFiles((files) =>
      files.filter((file) => file.name === 'config.json')
    );
  };

  const updateFile = (filename: string, data: ArrayBuffer) => {
    setCurrentFiles(
      currentFiles.map((file) => {
        if (file.name === filename) {
          return { ...file, data };
        }
        return file;
      })
    );
  };

  const renameFile = (filename: string, newFilename: string) => {
    setCurrentFiles(
      currentFiles.map((file) => {
        if (file.name === filename) {
          return { ...file, name: newFilename };
        }
        return file;
      })
    );
  };

  const getFile = (filename: string) => {
    return currentFiles.find((file) => file.name === filename);
  };

  const getSelectedFile = () => {
    if (!selectedFile) return null;
    return getFile(selectedFile);
  };

  const getTar = async () => {
    return await generateTar(currentFiles);
  };

  const setFiles = (files: File[], resetConfig = true) => {
    setCurrentFiles((oldFiles) => {
      const newFiles = files.filter((f) => f.name !== './');
      if (!newFiles.find((f) => f.name === 'config.json')) {
        newFiles.push(
          (!resetConfig && oldFiles.find((f) => f.name === 'config.json')) ||
            DEFAULT_CONFIG_JSON()
        );
      }
      return newFiles.sort((a, _b) => (a.name === 'config.json' ? -1 : 1));
    });
  };

  const setTar = async (tar: ArrayBuffer, resetConfig = true) => {
    const files = await parseTar(tar);
    setFiles(files, resetConfig);
  };

  const downloadFiles = async () => {
    const tar = await getTar();
    const blob = new Blob([tar], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'files.tar';
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    addFile,
    removeFile,
    clearFiles,
    updateFile,
    getTar,
    setFiles,
    setTar,
    renameFile,
    getFile,
    getSelectedFile,
    setSelectedFile,
    currentFiles,
    downloadFiles,
  };
}
