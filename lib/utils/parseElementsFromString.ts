import { JSDOM } from 'jsdom';
import { EmptyFileException } from '../exceptions/EmptyFileException';

export const parseElementsFromString = (html: string): NodeListOf<Element> => {
  if (!html.trim()) {
    throw new EmptyFileException();
  }

  const dom = new JSDOM(html);
  const { document } = dom.window;

  return document.querySelectorAll('div.character, div.dialog');
};
