import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import generate from './commands/generate';

const argv = yargs(hideBin(process.argv));

argv.command(generate).demandCommand().wrap(argv.terminalWidth()).help().parse();
