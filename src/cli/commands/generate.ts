import { Arguments } from 'yargs';

import { Builder } from '../../Builder';

export const command = 'generate';
export const desc = 'Generate .ghinfo file';
export const showInHelp = true;
export const builder = {
  dir: {
    string: true,
    alias: 'd',
    description: 'Directory with media files',
    default: 'media',
  },
  type: {
    string: true,
    alias: 't',
    description: 'Repository content type',
    default: '',
  },
};

interface IArguments {
  dir: string;
  type: string;
}

export const handler = ({ dir, type }: Arguments<IArguments>): Promise<void> => {
  const infoBuilder = new Builder(dir, type);

  return infoBuilder.generate();
};
