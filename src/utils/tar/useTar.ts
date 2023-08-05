import { useAtom } from 'jotai';
import { currentFiles as currentFilesAtom } from 'utils/atoms';
import generateTar from './generateTar';
import parseTar from './parseTar';
import { File } from 'utils/types';

export default function useTar() {
  const [currentFiles, setCurrentFiles] = useAtom(currentFilesAtom);

  const addFile = (file: File) => {
    setCurrentFiles([...currentFiles, file]);
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

  const getTar = async () => {
    return await generateTar(currentFiles);
  };

  const _setTar = async (tar: ArrayBuffer) => {
    const files = await parseTar(tar);
    setCurrentFiles(files);
  };

  return {
    addFile,
    removeFile,
    clearFiles,
    updateFile,
    getTar,
  };
}
