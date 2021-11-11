import { SpecificationController } from './specification.controller'
import { SpecificationService } from './specification.services'

const specificationSerice = new SpecificationService()
export const specificationController = new SpecificationController(specificationSerice)