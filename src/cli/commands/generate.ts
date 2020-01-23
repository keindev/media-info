import { Arguments } from 'yargs';
import { MediaInfo } from '../../MediaInfo';

export const command = 'generate';
export const desc = 'Generate .mediainfo file';
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
    const mediainfo = new MediaInfo(dir, type);

    return mediainfo.generate();
};
