import { Arguments } from 'yargs';
import { MediaInfo } from '../../MediaInfo';

export const command = 'generate';
export const alias = 'g';
export const desc = 'Generate .mediainfo file';
export const showInHelp = true;
export const builder = {
    dir: {
        string: true,
        alias: 'd',
        description: 'Directory with media files',
    },
};

interface IArguments {
    dir: string;
}

export const handler = (argv: Arguments<IArguments>): Promise<void> => {
    const mediainfo = new MediaInfo(argv.dir);

    return mediainfo.generate();
};
