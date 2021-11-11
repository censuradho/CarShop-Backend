import express from 'express'

import swaggerUi from 'swagger-ui-express'

import cors from 'cors'

import swaggerSetup from 'doc/swagger.json'

import routes from 'routes'

const app = express()

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
app.use(cors())
app.use(routes)

export default app