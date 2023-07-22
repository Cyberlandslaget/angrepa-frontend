import { TarWriter } from '@gera2ld/tarjs';
import { File } from 'utils/types';

export default async function generateTar(files: File[]) {
  const tar = new TarWriter();
  files.forEach((file) => {
    tar.addFile(file.name, file.data);
  });
  return (await tar.write()).arrayBuffer();
}
