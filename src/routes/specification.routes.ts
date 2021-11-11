import{ Router } from 'express'

import { specificationController } from 'modules/cars/useCases/specification'


const specificationRoutes = Router()

specificationRoutes
	.post('/', (request, response) => specificationController.store(request, response))
	.get('/', (request, response) => specificationController.index(request, response))
 
export { specificationRoutes }