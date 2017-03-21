import { Request, Response, NextFunction} from 'express'
import { Album, IAlbumModel } from '../models/schemas/Album'

export class AlbumController {

    test(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ 
            result: "Server up and running. Place a valid HTTP request according to the API"
        })
    }    
    
    getAlbum(req: Request, res: Response, next: NextFunction) {
        let albumId = req.params.id
        console.log(`Finding album ${ albumId }`)
        Album.findById(albumId)
            .then((album: IAlbumModel) => {
                if(album) {
                    res.status(200).json({ album: album })
                } else {
                    res.status(404).json({ error: `No album found with ID ${ albumId }`})
                }
            })
            .catch((error) => { res.status(500).json({ error: error })})
    }

    getAllAlbums(req: Request, res: Response, next: NextFunction) {
        console.log('Finding all albums')
        Album.find({}).sort('+_id').exec((error, albums) => {
            if (error) {
                res.status(500).json({ error: error })
            } else {
                if(albums) {
                    res.status(200).json({ albums: albums })
                } else {
                    res.status(404).json({ error: 'Could not find any album'})
                }
            }
        })
    }

    saveAlbum(req: Request, res: Response, next: NextFunction) {
        // If _id is passed in params it is deleted to avoid an error. A new register can
        // not has its _id defined
        delete req.body._id 

        let album = new Album( req.body )
        album.save()
            .then(( updatedAlbum: IAlbumModel ) => {
                res.status(200).json({ album: updatedAlbum })
            })
            .catch(( error => {
                res.status(500).json({ error: error })
            }))
    }   

    updateAlbum(req: Request, res: Response, next: NextFunction) {
        let albumId = req.params.id
        let updatedAlbum: IAlbumModel = req.body
        console.log(`Updating album ${ albumId } with information:`)
        console.log(updatedAlbum)

        Album.findByIdAndUpdate(albumId, updatedAlbum)
            .then((updatedAlbum: IAlbumModel) => {
                res.status(200).json({  album: updatedAlbum })
            })
            .catch((error => {
                res.status(500).json({ error: error })
            }))
    }    

    deleteAlbum(req: Request, res: Response, next: NextFunction) {
        let albumId = req.params.id
        console.log(`Deleting album ${ albumId }`)
        
        Album.findByIdAndRemove(albumId)
            .then((deletedAlbum: IAlbumModel) => {
                res.status(200).json({ album: deletedAlbum })
            })
            .catch((error => {
                res.status(500).json({ error: error })
            }))
    }    
}

export default new AlbumController()