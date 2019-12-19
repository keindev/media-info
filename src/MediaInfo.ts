import path from 'path';
import fs from 'fs';
import globby from 'globby';
import readPkg from 'read-pkg';
import gh from 'parse-github-url';
import figures from 'figures';
import { UpdateManager } from 'stdout-update';
import { IMediaInfoData, IFileInfo } from './types/Data';

const manager = UpdateManager.getInstance();
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export class MediaInfo {
    private dir: string;
    private message = '';
    private timer: NodeJS.Timeout | null = null;
    private frameIndex = 0;

    constructor(dir: string) {
        this.dir = path.relative(process.cwd(), dir);
    }

    public static getFileInfo(filePath: string, repo: string): IFileInfo {
        return {
            source: `https://github.com/${repo}/${filePath}`,
            cdn: `https://cdn.jsdelivr.net/gh/${repo}/${filePath}`,
        };
    }

    public static build(paths: string[], repo: string): IMediaInfoData {
        const map: Map<string, IFileInfo> = new Map();
        let info: IFileInfo | undefined;
        let newInfo: IFileInfo;
        let name: string;
        let extname: string;

        paths.forEach(filePath => {
            name = path.parse(filePath).name;
            info = map.get(name);
            newInfo = MediaInfo.getFileInfo(filePath, repo);

            if (info) {
                extname = path.extname(filePath).slice(1);

                if (info.alt) {
                    info.alt = { ...info.alt, [extname]: newInfo };
                } else {
                    map.set(name, { ...info, alt: { [extname]: newInfo } });
                }
            } else {
                map.set(name, newInfo);
            }
        });

        return Object.fromEntries(map);
    }

    public async generate(): Promise<void> {
        this.start();

        try {
            const paths = await globby([`${this.dir}/**/*.*`], { gitignore: false });
            const pkg = await readPkg({ normalize: false });
            const url = typeof pkg.repository === 'object' ? pkg.repository.url : pkg.repository;

            if (url) {
                const git = gh(url);

                if (git && git.repo) {
                    if (paths.length) {
                        await fs.promises.writeFile(
                            path.relative(process.cwd(), '.mediainfo'),
                            JSON.stringify(MediaInfo.build(paths, git.repo), null, 4)
                        );
                    }

                    this.end();
                } else {
                    throw new Error('Invalid package repository url!');
                }
            } else {
                throw new Error('Package repository is not defined!');
            }
        } catch (error) {
            this.error(error);
        }
    }

    private start(): void {
        manager.hook();
        this.timer = setInterval(() => {
            const frame = frames[(this.frameIndex = ++this.frameIndex % frames.length)];

            manager.update([`${frame} process: ${this.message}`]);
        }, 80);
    }

    private end(msg = [`${figures.tick} .mediainfo created!`]): void {
        if (this.timer) {
            clearInterval(this.timer);
            manager.update(msg, 0);
            manager.unhook(false);
        }
    }

    private error(error: Error): never {
        this.end([`${figures.cross} Error!`]);

        throw error;
    }
}
