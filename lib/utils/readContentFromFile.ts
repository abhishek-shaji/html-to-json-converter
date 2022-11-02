import { readFileSync } from 'fs';

export const readContentFromFile = (path: string): string => {
  try {
    return readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err);
  }
};
