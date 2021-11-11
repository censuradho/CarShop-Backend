import { ImportCategoryController } from './importCategory.controller'
import { ImportCategoryService } from './importCategory.service'

const importCategoryService = new ImportCategoryService()
export const importCategoryController = new ImportCategoryController(importCategoryService)