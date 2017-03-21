import { IAlbumModel } from '../schemas/Album'

export interface IImage {
    title: string
    fileName: string
    album: IAlbumModel
}