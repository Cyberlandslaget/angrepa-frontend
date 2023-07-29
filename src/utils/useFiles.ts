import { useAtom } from 'jotai';
import {
  currentFiles as currentFilesAtom,
  currentlySelectedFile,
} from 'utils/atoms';
import generateTar from './tar/generateTar';
import parseTar from './tar/parseTar';
import { File } from 'utils/types';

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
    setCurrentFiles([]);
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

  const setTar = async (tar: ArrayBuffer) => {
    const files = await parseTar(tar);
    setCurrentFiles((curFiles) => [
      ...curFiles.filter((f) => f.name !== 'config.json'),
      ...files,
    ]);
  };

  const setFiles = (files: File[]) => {
    setCurrentFiles(files);
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
  };
}
