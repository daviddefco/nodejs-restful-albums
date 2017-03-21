import { Router } from 'express';
import AlbumController from '../controllers/AlbumController'
import ImageController from '../controllers/ImageController'
import * as multipart from 'connect-multiparty'

export class Routes {
    router: Router
    multipartMiddleware = multipart({ uploadDir: '../../uploads' })

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
        this.router.post('/image/:id', this.multipartMiddleware, ImageController.uploadImageFile)
    }
}

const routes = new  Routes()
export default routes.router