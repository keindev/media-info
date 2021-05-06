import { Arguments } from 'yargs';

import Builder from '../../index';

interface IArguments {
  dir: string;
  type: string;
}

export default {
  command: 'generate',
  desc: 'Generate .ghinfo file',
  showInHelp: true,
  builder: {
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
  },
  handler: ({ dir, type }: Arguments<IArguments>): Promise<void> => new Builder(dir, type).generate(),
};
