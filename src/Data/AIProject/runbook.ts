/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync, writeFileSync } from 'fs';
import recipe1OutputFormatted from './recipe1/formatted';
import recipe2OutputFormatted from './recipe2/formatted';
import recipe3OutputFormatted from './recipe3/formatted';
import recipe4OutputFormatted from './recipe4/formatted';
import recipe5OutputFormatted from './recipe5/formatted';
import recipe6OutputFormatted from './recipe6/formatted';
import recipe7OutputFormatted from './recipe7/formatted';
import recipe8OutputFormatted from './recipe8/formatted';
import recipe9OutputFormatted from './recipe9/formatted';
import recipe10OutputFormatted from './recipe10/formatted';

const getData = (systemContent: string, input: string, formatted: any) => {
  const updatedInput = input.replace(/\\n\\n/g, '\n');

  return {
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      {
        role: 'user',
        content: updatedInput,
      }, {
        role: 'assistant',
        content: JSON.stringify(formatted, null, 0),
      },
    ],
  };
};

// read in inputs - assign to messages[1].content
// read in formatted - assign to messages[2].content
// cast as json
// add it to the json file
const systemInput = './system-content.txt';
const systemContent = readFileSync(systemInput, 'utf8');

const recipe1Input = readFileSync('./recipe1/inputs.txt', 'utf8');
const recipe2Input = readFileSync('./recipe2/inputs.txt', 'utf8');
const recipe3Input = readFileSync('./recipe3/inputs.txt', 'utf8');
const recipe4Input = readFileSync('./recipe4/inputs.txt', 'utf8');
const recipe5Input = readFileSync('./recipe5/inputs.txt', 'utf8');
const recipe6Input = readFileSync('./recipe6/inputs.txt', 'utf8');
const recipe7Input = readFileSync('./recipe7/inputs.txt', 'utf8');
const recipe8Input = readFileSync('./recipe8/inputs.txt', 'utf8');
const recipe9Input = readFileSync('./recipe9/inputs.txt', 'utf8');
const recipe10Input = readFileSync('./recipe10/inputs.txt', 'utf8');

// In your runbook.ts, for multiple examples:
const trainingExamples = [
  getData(systemContent, recipe1Input, recipe1OutputFormatted),
  getData(systemContent, recipe2Input, recipe2OutputFormatted),
  getData(systemContent, recipe3Input, recipe3OutputFormatted),
  getData(systemContent, recipe4Input, recipe4OutputFormatted),
  getData(systemContent, recipe5Input, recipe5OutputFormatted),
  getData(systemContent, recipe6Input, recipe6OutputFormatted),
  getData(systemContent, recipe7Input, recipe7OutputFormatted),
  getData(systemContent, recipe8Input, recipe8OutputFormatted),
  getData(systemContent, recipe9Input, recipe9OutputFormatted),
  getData(systemContent, recipe10Input, recipe10OutputFormatted),
  // ... more examples
];

// Write as JSONL (one JSON object per line)
const jsonlContent = trainingExamples
  .map((example) => JSON.stringify(example, null, 0))
  .join('\n');

writeFileSync('./training-data.jsonl', jsonlContent);
