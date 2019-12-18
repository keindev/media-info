import path from 'path';
import globby from 'globby';
import readPkg from 'read-pkg';
import gh from 'parse-github-url';
import figures from 'figures';
import { UpdateManager } from 'stdout-update';
import { IFileInfo } from './types/Data';

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

    public static getFileInfo(filePath: string, git: gh.Result): IFileInfo {
        return {
            source: `https://${git.hostname}/${git.repo}/${filePath}`,
            cdn: `https://cdn.jsdelivr.net/gh/${git.repo}/${filePath}`,
        };
    }

    public async generate(): Promise<void> {
        this.start();

        try {
            const paths = await globby([`${this.dir}/**/*.*`], { gitignore: false });
            const pkg = await readPkg({ normalize: false });
            const url = typeof pkg.repository === 'object' ? pkg.repository.url : pkg.repository;
            const git = gh(url);

            if (paths.length) {
                console.log(
                    paths.reduce(
                        (acc, filePath) => ({
                            ...acc,
                            [path.parse(filePath).name]: MediaInfo.getFileInfo(filePath, git),
                        }),
                        {}
                    )
                );
            }

            this.end();
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

    private end(msg = [`${figures.tick} .mediainfo created!`, '']): void {
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
