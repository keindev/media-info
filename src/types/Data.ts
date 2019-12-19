export interface IFileInfo {
    source: string;
    cdn: string;
    alt?: IMediaInfoData;
}

export interface IMediaInfoData {
    [key: string]: IFileInfo;
}
