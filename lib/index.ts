import { readContentFromFile } from './utils/readContentFromFile';
import { parseElementsFromString } from './utils/parseElementsFromString';
import { transformToJson } from './utils/transformToJson';
import { saveContentToFile } from './utils/saveContentToFile';

(async () => {
  const filename = process.argv[2];

  const htmlContent = readContentFromFile(filename);
  const elements = parseElementsFromString(htmlContent);
  const output = transformToJson(elements);

  saveContentToFile('output/data.json', output);
})();
