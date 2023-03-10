import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createWriteStream } from "fs";

const { readJSON, writeJSON, writeFile, createReadStream } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const mediasJSONPath = join(dataFolderPath, "medias.json");

const mediasPublicFolderPath = join(process.cwd(), "./public/img/medias");

export const getMedias = () => readJSON(mediasJSONPath);
export const writeMedias = (mediasArray) =>
  writeJSON(mediasJSONPath, mediasArray);

export const saveMediasImg = (fileName, fileContentAsBuffer) =>
  writeFile(join(mediasPublicFolderPath, fileName), fileContentAsBuffer);

export const getMediasJSONReadableStream = () =>
  createReadStream(mediasJSONPath);
export const getPDFWritableStream = (filename) =>
  createWriteStream(join(dataFolderPath, filename));
