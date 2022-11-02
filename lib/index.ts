import { readContentFromFile } from './utils/readContentFromFile';
import { parseElementsFromString } from './utils/parseElementsFromString';
import { transformToJson } from './utils/transformToJson';
import { saveContentToFile } from './utils/saveContentToFile';

(async () => {
  const filename = process.argv[2];

  try {
    console.info('Attempting to convert html text to JSON');

    const htmlContent = readContentFromFile(filename);
    const elements = parseElementsFromString(htmlContent);
    const output = transformToJson(elements);

    saveContentToFile('output/data.json', output);

    console.info(
      `Successfully converted ${filename} to JSON. Please find the .json file in the output directory`
    );
  } catch (e) {
    console.error('Failed to convert text to JSON. Reason:', e.message);
    process.exit(1);
  }
})();
