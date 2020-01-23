<p align="center"><img width="400" src="https://cdn.jsdelivr.net/gh/keindev/media-info/media/logo.svg" alt="GitHub GraphQL API client for JavaScript"></p>

<p align="center">
    <a href="https://travis-ci.com/keindev/media-info"><img src="https://travis-ci.com/keindev/media-info.svg?branch=master" alt="Build Status"></a>
    <a href="https://codecov.io/gh/keindev/media-info"><img src="https://codecov.io/gh/keindev/media-info/branch/master/graph/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/media-info"><img alt="npm" src="https://img.shields.io/npm/v/media-info.svg"></a>
    <a href="https://www.npmjs.com/package/media-info"><img alt="NPM" src="https://img.shields.io/npm/l/media-info.svg"></a>
</p>

CLI util for generating a GitHub project information file

## Install

### Yarn

```console
yarn add media-info
```

### NPM

```console
npm install media-info
```

## Usage

```console
mediainfo --help

mediainfo generate -d media -t utils
```

## Commands

### generate

Generate `.mediainfo` file

Options:

-   `-dir` | `-d`: Directory with media files
-   `-type` | `-t`: Repository content type

## License

[MIT](LICENSE)
