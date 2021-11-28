import{ Router } from 'express'

import { categoryController } from 'modules/cars/useCases/category'

import {  importCategoryRoutes } from './importCategory.routes'
const categoriesRoutes = Router()

categoriesRoutes
	.post('/', (request, response) => categoryController.store(request, response))
	.get('/', (request, response) => categoryController.index(request, response))

categoriesRoutes.use(importCategoryRoutes)

export { categoriesRoutes }