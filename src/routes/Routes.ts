import { Router } from 'express';

export class Routes {
    router: Router

    constructor() {
        this.router = Router()
        this.configureRoutes()
    }

    configureRoutes() {
/*        
        this.router.get('/', FavoritesController.test)
        this.router.get('/favorite/:id', FavoritesController.getFavorite)
        this.router.get('/favorite', FavoritesController.getAllFavorites)
        this.router.post('/favorite', FavoritesController.saveFavorite)
        this.router.put('/favorite/:id', FavoritesController.updateFavorite)
        this.router.delete('/favorite/:id', FavoritesController.deleteFavorite)
*/        
    }
}

const routes = new  Routes()
export default routes.router