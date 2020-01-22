import { Arguments } from 'yargs';
import { MediaInfo } from '../../MediaInfo';

export const command = 'generate';
export const alias = 'g';
export const desc = 'Generate .mediainfo file';
export const showInHelp = true;
export const builder = {
    media: {
        string: true,
        alias: 'm',
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
    media: string;
    type: string;
}

export const handler = (argv: Arguments<IArguments>): Promise<void> => {
    const mediainfo = new MediaInfo(argv.media, argv.type);

    return mediainfo.generate();
};
