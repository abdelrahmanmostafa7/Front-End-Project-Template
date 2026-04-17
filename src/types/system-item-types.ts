export interface IFileSystem {
  id: number;
  name: string;
  updatedAt?: string;
  type: File;
  size: number;
  url: string;
  extension: string;
}
