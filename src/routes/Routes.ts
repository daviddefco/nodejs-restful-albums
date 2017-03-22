import { Router } from 'express';
import AlbumController from '../controllers/AlbumController'
import ImageController from '../controllers/ImageController'
import * as multer from 'multer'

export class Routes {
    router: Router    
    multerMiddleware = multer({ dest: 'uploads' })

    constructor() {
        this.router = Router()
        this.configureRoutes()
    }

    configureRoutes() {      
        this.router.get('/', AlbumController.test)
        this.router.get('/album/:id', AlbumController.getAlbum)
        this.router.get('/album', AlbumController.getAllAlbums)
        this.router.post('/album', AlbumController.saveAlbum)
        this.router.put('/album/:id', AlbumController.updateAlbum)
        this.router.delete('/album/:id', AlbumController.deleteAlbum)
        this.router.get('/image/:id', ImageController.getImage)
        this.router.get('/image', ImageController.getAllImages)
        this.router.get('/image/album/:album', ImageController.getAllImages)
        this.router.post('/image', ImageController.saveImage)
        this.router.put('/image/:id', ImageController.updateImage)
        this.router.delete('/image/:id', ImageController.deleteImage)
        // multer middleware accepts only one file in the field 'image'
        this.router.post(
            '/upload-image/:id', 
            this.multerMiddleware.single('image'), ImageController.uploadImageFile
        )
        this.router.get('/image-file/:id', ImageController.getImageFile)
    }
}

const routes = new  Routes()
export default routes.router