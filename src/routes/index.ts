import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specification.routes'

const routes = Router()

routes.use('/category', categoriesRoutes)
routes.use('/specification', specificationRoutes)

export default routes
