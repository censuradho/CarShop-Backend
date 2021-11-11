import { Request, Response } from 'express'

import { ImportCategoryService } from './importCategory.service'

export class ImportCategoryController {
	constructor (private service: ImportCategoryService) {}

	async handle(request: Request, response: Response) {
		const { file } = request

		console.log(file)

		response.sendStatus(201)
	}
}