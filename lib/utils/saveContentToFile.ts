import { writeFileSync, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

const removeFilePart = (dirname) => path.dirname(dirname);

export const saveContentToFile = (file: string, data: string) => {
  const dirname = removeFilePart(file);

  if (!existsSync(dirname)) {
    mkdirSync(dirname, { recursive: true });
  }

  writeFileSync(file, data);
};
