import * as mongoose from 'mongoose'
import { IAlbum } from '../interfaces/Album'
import * as bluebird from 'bluebird'

(<any>mongoose).Promise = bluebird

export interface IAlbumModel extends IAlbum, mongoose.Document {}

var albumSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    description: String
})

albumSchema.pre('save', next => {
    let now = new Date()
    if (!this.createdAt) {
        this.createdAt = now
    }
    next()
})

export const Album: mongoose.Model<IAlbumModel> = mongoose.model<IAlbumModel>("Album", albumSchema)