import fs from 'fs'
import crypto from 'crypto'
import csvParse from 'csv-parse'

import { unlinkAsync } from 'utils/unLinkAsync'

import prisma from 'prisma'

import { Category } from '@prisma/client'



type CategoryRequest = Pick<Category, 'description' | 'name'>

export class CategoryService {

	async store ({ name, description }: CategoryRequest) {
		const categoryStoraged = await this.findByName(name)

		if (categoryStoraged) throw new Error('CATEGORY_ALREADY_EXIST')

		const category = await prisma.category.create({
			data: {
				id: crypto.randomUUID(),
				description,
				name
			}
		})

		return category
	}

	async index () {
		return await prisma.category.findMany()
	}

	async findByName (name: string) {
		return await prisma.category.findFirst({ where: { name }})
	}

	loadCategory (file: Express.Multer.File): Promise<CategoryRequest[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path)
			const categories: CategoryRequest[] = []
	
			const parseFile = csvParse()
	
			stream.pipe(parseFile)
	
			parseFile.on('data', async row => {
				const [name, description] = row
	
				categories.push({
					name,
					description
				})
			})
				.on('end',  () => {
					fs.promises.unlink(file.path)
					resolve(categories)
				})
				.on('error', err => reject(err))
				
		})
	}

}