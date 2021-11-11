import { Router } from 'express'

import { multer } from 'config/multer'

import { importCategoryController } from 'modules/cars/useCases/importCategory'

const importCategoryRoutes = Router()

importCategoryRoutes
	.post('/import', multer.single('file'), (request, response) => importCategoryController.handle(request, response))
  
export { importCategoryRoutes }