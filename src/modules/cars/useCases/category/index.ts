import { CategoryController } from './category.controller'
import { CategoryService } from './category.services'

const categoryService = new CategoryService()

export const categoryController = new CategoryController(categoryService)