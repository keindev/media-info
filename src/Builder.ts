import path from 'path';
import fs from 'fs';
import globby from 'globby';
import readPkg, { PackageJson } from 'read-pkg';
import gh from 'parse-github-url';
import figures from 'figures';
import { UpdateManager } from 'stdout-update';

const manager = UpdateManager.getInstance();
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export enum AvailableFiles {
    Icon = 'icon',
    Logo = 'logo',
    Demo = 'demo',
    Preview = 'social-preview',
}

export interface ILinks {
    git?: string;
    npm?: string;
    homepage?: string;
}

export interface IInfoFile {
    name: string;
    repo: string;
    version: string;
    type?: string;
    description: string;
    keywords?: string[];
    links: ILinks;
    files: {
        [key in AvailableFiles]?: string;
    };
}

export class Builder {
    private dir: string;
    private type: string;
    private message = '';
    private timer: NodeJS.Timeout | null = null;
    private frameIndex = 0;

    constructor(dir: string, type: string) {
        this.dir = path.relative(process.cwd(), dir);
        this.type = type;
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
                            path.relative(process.cwd(), '.ghinfo'),
                            JSON.stringify(this.build(paths, pkg, git.repo), null, 4)
                        );
                    }

                    this.end();
                } else {
                    throw new Error('Invalid package repository url!');
                }
            } else {
                throw new Error('Package repository is undefined!');
            }
        } catch (error) {
            this.error(error);
        }
    }

    public build(paths: string[], pkg: PackageJson, repo: string): IInfoFile {
        const { name, version, description, homepage, keywords } = pkg;
        const availableFiles = Object.values(AvailableFiles);

        if (!name) throw new Error('Package name is undefined!');
        if (!version) throw new Error('Package name is undefined!');
        if (!description) throw new Error('Package name is undefined!');

        return {
            name,
            version,
            description,
            keywords,
            repo,
            type: this.type,
            links: {
                git: `https://github.com/${repo}`,
                ...(pkg.isPrivate ? {} : { npm: `https://www.npmjs.com/package/${name}` }),
                ...(homepage ? { homepage } : {}),
            },
            files: paths.reduce((acc, filePath) => {
                const { name: fileName } = path.parse(filePath);

                return ~availableFiles.indexOf(fileName as AvailableFiles) ? { ...acc, [fileName]: filePath } : acc;
            }, {}),
        };
    }

    private start(): void {
        manager.hook();
        this.timer = setInterval(() => {
            const frame = frames[(this.frameIndex = ++this.frameIndex % frames.length)];

            manager.update([`${frame} process: ${this.message}`]);
        }, 80);
    }

    private end(msg = [`${figures.tick} .ghinfo created!`]): void {
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
