import { MediaInfo } from '../MediaInfo';

const repo = 'keindev/media-info';
const type = 'test';
const paths = ['media/logo.svg', 'media/logo.jpg', 'media/social-preview.png'];
let builder: MediaInfo;

describe('MediaInfo', () => {
    describe('Generate .mediainfo file', () => {
        beforeEach(() => {
            builder = new MediaInfo(process.cwd(), type);
        });

        it('Build media info structure', () => {
            const pkg = { name: 'media-info', version: '1.0.0', description: 'test' };
            const info = builder.build(paths, pkg, repo);

            expect(info).toStrictEqual({
                ...pkg,
                repo,
                type,
                links: {
                    git: `https://github.com/${repo}`,
                    npm: `https://www.npmjs.com/package/${pkg.name}`,
                },
                files: {
                    logo: 'media/logo.jpg',
                    'social-preview': 'media/social-preview.png',
                },
            });
        });
    });
});
