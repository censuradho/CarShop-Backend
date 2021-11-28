import crypto from 'crypto'

import prisma from 'prisma'

import { Category } from '.prisma/client'
import csvParse from 'csv-parse'

import fs from 'fs'
import { unlinkAsync } from 'utils/unLinkAsync'

type ImportCategoryRow = Pick<Category, 'description' | 'name'>

export class ImportCategoryService {
	loadCategory (file: Express.Multer.File): Promise<ImportCategoryRow[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path)
			const categories: ImportCategoryRow[] = []
	
			const parseFile = csvParse()
	
			stream.pipe(parseFile)
	
			parseFile.on('data', async row => {
				const [name, description] = row
	
				categories.push({
					name,
					description
				})
			})
				.on('end', () => {
					// fs.promises.unlink(file.path)
					resolve(categories)
				})
				.on('error', err => reject(err))
			
		})
	}
	async importCategory (file: Express.Multer.File) {
		const categories = await this.loadCategory(file)
		

		const queries = categories.map(category => 
			prisma.category.create({ 
				data: {
					id: crypto.randomUUID(),
					description: category.description,
					name: category.name
				}
			})
		)

		return await prisma.$transaction(queries)

	}
}