import { readFileSync } from 'fs';
import { FileReadFailureException } from '../exceptions/FileReadFailureException';

export const readContentFromFile = (path: string): string => {
  try {
    return readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err);

    throw new FileReadFailureException();
  }
};
