import { Request, Response } from 'express'

import { ImportCategoryService } from './importCategory.service'

import { unlinkAsync } from 'utils/unLinkAsync'

export class ImportCategoryController {
	constructor (private service: ImportCategoryService) {}

	async handle(request: Request, response: Response) {
		const { file } = request

		if (!file) return response.status(400).json({
			error: 'ERROR_FILE_PROPERTY_NULL'
		})

		try {
			await this.service.importCategory(file)
	
			response.sendStatus(201)
		} catch (err) {
			if (err instanceof Error) return response.status(400).json({
				error: err.message
			})
		} finally {
			await unlinkAsync(file.path)
		}
	}
}