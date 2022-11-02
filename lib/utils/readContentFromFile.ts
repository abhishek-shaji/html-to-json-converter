import { readFileSync } from 'fs';

export const readContentFromFile = async (path: string): Promise<string> => {
  try {
    return readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err);
  }
};
