export enum AvailableMediaFile {
  Icon = 'icon',
  Logo = 'logo',
  Demo = 'demo',
  Preview = 'social-preview',
}

export interface IGitHubInfo {
  name: string;
  repo: string;
  version: string;
  type?: string;
  description: string;
  keywords?: string[];
  links: {
    git?: string;
    npm?: string;
    homepage?: string;
  };
  files: {
    [key in AvailableMediaFile]?: string;
  };
}
