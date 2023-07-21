import { TarReader } from '@gera2ld/tarjs';
import { File } from 'utils/types';

export default async function parseTar(tar: ArrayBuffer) {
  const reader = new TarReader();
  const fileinfo = await reader.readFile(tar);
  return await Promise.all(
    fileinfo.map(async (file) => {
      return {
        name: file.name,
        data: await reader.getFileBlob(file.name).arrayBuffer(),
      } as File;
    })
  );
}
