import { Request, Response, NextFunction} from 'express'
import { Image, IImageModel } from '../models/schemas/Image'
import { Album } from '../models/schemas/Album'
import { DocumentQuery } from 'mongoose'
import * as path from 'path'

export class ImageController {

    getImage(req: Request, res: Response, next: NextFunction) {
        let imageId = req.params.id
        console.log(`Finding image ${ imageId }`)
        Image.findById(imageId)
            .then((image: IImageModel) => {
                if(image) {
                    Album.populate(image, { path: 'album' }, (error, image) => {
                        if (error) {
                            res.status(500).json({ error: error })
                        } else {
                            res.status(200).json({ image: image })
                        }
                    })
                } else {
                    res.status(404).json({ error: `No image found with ID ${ imageId }`})
                }
            })
            .catch((error) => { res.status(500).json({ error: error })})
    }

    getAllImages(req: Request, res: Response, next: NextFunction) {
        let albumId = req.params.album
        let query: DocumentQuery<IImageModel[], IImageModel>

        if(!albumId) {
            console.log('Finding all images')
            query = Image.find({}).sort('+_title')
        } else {
            console.log(`Finding all images of album ${ albumId }`)
            query = Image.find({ album: albumId }).sort('+_id')
        }

        query.exec((error, images) => {
            if (error) {
                res.status(500).json({ error: error })
            } else {
                if(images) {
                    Album.populate(images, { path: 'album' }, (error, images) => {
                        if (error) {
                            res.status(500).json({ error: error })
                        } else {
                            res.status(200).json({ images: images })
                        }
                    })
                } else {
                    res.status(404).json({ error: 'Could not find any image'})
                }
            }
        })
    }

    saveImage(req: Request, res: Response, next: NextFunction) {
        // If _id is passed in params it is deleted to avoid an error. A new register can
        // not has its _id defined
        delete req.body._id 

        let image = new Image( req.body )
        image.save()
            .then(( updatedImage: IImageModel ) => {
                res.status(200).json({ image: updatedImage })
            })
            .catch(( error => {
                res.status(500).json({ error: error })
            }))
    }   

    updateImage(req: Request, res: Response, next: NextFunction) {
        let imageId = req.params.id
        let updatedimage: IImageModel = req.body
        console.log(`Updating image ${ imageId } with information:`)
        console.log(updatedimage)

        Image.findByIdAndUpdate(imageId, updatedimage)
            .then((updatedimage: IImageModel) => {
                res.status(200).json({ image: updatedimage })
            })
            .catch((error => {
                res.status(500).json({ error: error })
            }))
    }    

    deleteImage(req: Request, res: Response, next: NextFunction) {
        let imageId = req.params.id
        console.log(`Deleting image ${ imageId }`)
        
        Image.findByIdAndRemove(imageId)
            .then((deletedImage: IImageModel) => {
                res.status(200).json({ image: deletedImage })
            })
            .catch((error => {
                res.status(500).json({ error: error })
            }))
    }  

    uploadImageFile(req: Request, res: Response, next: NextFunction) {
        let imageId = req.params.id
        let fileName

        if((<any>req).files) {
            let filePath = (<any>req).files.image.path
            let fileSplit = filePath.split('\\')
            fileName = fileSplit[1]
            console.log('filename :' + fileName)
        }
    }
}

export default new ImageController()