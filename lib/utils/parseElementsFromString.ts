import { JSDOM } from 'jsdom';

export const parseElementsFromString = (html: string): NodeListOf<Element> => {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  return document.querySelectorAll('div.character, div.dialog');
};
