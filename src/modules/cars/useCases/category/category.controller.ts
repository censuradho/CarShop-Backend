import { Request, Response } from 'express'

import { CategoryService } from 'modules/cars/useCases/category/category.services'

export class CategoryController {

	constructor (private readonly service: CategoryService) {}

	async store (request: Request, response: Response) {

		try {

			const result = await this.service.store(request.body)

			return response.status(201).json(result)
		} catch (err) {
			if (err instanceof Error) return response.status(400).json({
				error: err.message
			})
		}
	}

	async index (request: Request, response: Response) {
		const result = await this.service.index()
	
		return response.json(result)

	}
}