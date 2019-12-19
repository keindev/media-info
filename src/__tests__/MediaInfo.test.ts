import { MediaInfo } from '../MediaInfo';

const repo = 'keindev/media-info';
const paths = ['media/logo.svg', 'media/logo.jpg', 'media/social-preview.png'];

describe('MediaInfo', () => {
    describe('Generate .mediainfo file', () => {
        it('Create file info', () => {
            const info = MediaInfo.getFileInfo(paths[0], repo);

            expect(info).toStrictEqual({
                source: `https://github.com/${repo}/${paths[0]}`,
                cdn: `https://cdn.jsdelivr.net/gh/${repo}/${paths[0]}`,
            });
        });

        it('Build media info structure', () => {
            const info = MediaInfo.build(paths, repo);

            expect(info).toStrictEqual({
                logo: {
                    source: `https://github.com/${repo}/${paths[0]}`,
                    cdn: `https://cdn.jsdelivr.net/gh/${repo}/${paths[0]}`,
                    alt: {
                        jpg: {
                            source: `https://github.com/${repo}/${paths[1]}`,
                            cdn: `https://cdn.jsdelivr.net/gh/${repo}/${paths[1]}`,
                        },
                    },
                },
                'social-preview': {
                    source: `https://github.com/${repo}/${paths[2]}`,
                    cdn: `https://cdn.jsdelivr.net/gh/${repo}/${paths[2]}`,
                },
            });
        });
    });
});
