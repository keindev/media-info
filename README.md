<p align="center"><img width="400" src="https://cdn.jsdelivr.net/gh/keindev/ghinfo/media/logo.svg" alt="GitHub GraphQL API client for JavaScript"></p>

<p align="center">
    <a href="https://travis-ci.com/keindev/ghinfo"><img src="https://travis-ci.com/keindev/ghinfo.svg?branch=master" alt="Build Status"></a>
    <a href="https://codecov.io/gh/keindev/ghinfo"><img src="https://codecov.io/gh/keindev/ghinfo/branch/master/graph/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/ghinfo"><img alt="npm" src="https://img.shields.io/npm/v/ghinfo.svg"></a>
    <a href="https://www.npmjs.com/package/ghinfo"><img alt="NPM" src="https://img.shields.io/npm/l/ghinfo.svg"></a>
</p>

CLI util for generating a GitHub project information file

## Install

### Yarn

```console
yarn add ghinfo
```

### NPM

```console
npm install ghinfo
```

## Usage

```console
ghinfo --help

ghinfo generate -d media -t utils
```

## Commands

### generate

Generate `.ghinfo` file

Options:

-   `-dir` | `-d`: Directory with media files
-   `-type` | `-t`: Repository content type

## License

[MIT](LICENSE)
