import * as mongoose from 'mongoose'
import { IImage } from '../interfaces/Image'
import * as bluebird from 'bluebird'

(<any>mongoose).Promise = bluebird

export interface IImageModel extends IImage, mongoose.Document {}

var imageSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    fileName: String,
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }
})

imageSchema.pre('save', next => {
    let now = new Date()
    if (!this.createdAt) {
        this.createdAt = now
    }
    next()
})

export const Image: mongoose.Model<IImageModel> = mongoose.model<IImageModel>("Image", imageSchema)