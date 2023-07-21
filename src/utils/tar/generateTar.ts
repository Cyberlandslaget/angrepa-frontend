import { TarWriter } from "@gera2ld/tarjs";

export default async function generateTar(files: any[]) {
    const tar = new TarWriter();
    files.forEach((file) => {
        tar.addFile(file.path, file.content);
    });
    return (await tar.write()).arrayBuffer();
}