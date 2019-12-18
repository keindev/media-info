export interface IFileInfo {
    source: string;
    cdn: string;
}

export interface IMediaInfoData {
    [key: string]: IFileInfo;
}
