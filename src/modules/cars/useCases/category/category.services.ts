import prisma from 'prisma'

import {  Category } from '@prisma/client'

import crypto from 'crypto'


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
}