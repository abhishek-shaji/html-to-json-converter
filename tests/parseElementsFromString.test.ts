import { parseElementsFromString } from '../lib/utils/parseElementsFromString';
import { EmptyFileException } from '../lib/exceptions/EmptyFileException';

const mockHtmlWithoutActions = `
<div class="character">CH_lucy</div>
<div class="dialog">Yes, Mama.</div>
`;

describe('parseElementsFromString', () => {
  it('should parse a html string and return an array of elements that are either a character or a dialog', () => {
    const elements = parseElementsFromString(mockHtmlWithoutActions);

    expect(elements.length).toEqual(2);

    for (const element of elements) {
      expect(element.tagName).toEqual('DIV');
    }
  });

  it('should throw an error if the file is empty and the content is empty', () => {
    try {
      parseElementsFromString('');
      expect(true).toEqual(false);
    } catch (e) {
      expect(e).toBeInstanceOf(EmptyFileException);
    }
  });
});
