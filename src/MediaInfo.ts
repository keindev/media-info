import { UpdateManager } from 'stdout-update';

const manager = UpdateManager.getInstance();
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export class MediaInfo {
    private dir: string;
    private message = '';
    private timer: NodeJS.Timeout | null = null;
    private frameIndex = 0;

    constructor(dir: string) {
        this.dir = dir;
    }

    public async generate(): Promise<void> {
        this.start();
        // eslint-disable-next-line no-console
        console.log(this.dir);
        this.end();

        return Promise.resolve();
    }

    private start(): void {
        manager.hook();
        this.timer = setInterval(() => {
            const frame = frames[(this.frameIndex = ++this.frameIndex % frames.length)];

            manager.update([`${frame} process: ${this.message}`]);
        }, 80);
    }

    private end(): void {
        if (this.timer) {
            clearInterval(this.timer);

            manager.update(['✔ .mediainfo created!', ''], 0);
            manager.unhook(false);
        }
    }
}
