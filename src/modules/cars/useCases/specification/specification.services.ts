import prisma from 'prisma'

import {  Specification } from '@prisma/client'

import crypto from 'crypto'


type SpecificationRequest = Pick<Specification, 'description' | 'name'>

export class SpecificationService {

	async store ({ name, description }: SpecificationRequest) {
		const specificationStoraged = await this.findByName(name)

		if (specificationStoraged) throw new Error('SPECIFICATION_ALREADY_EXIST')

		return await prisma.specification.create({
			data: {
				id: crypto.randomUUID(),
				description,
				name
			}
		})

	}

	async index () {
		return await prisma.specification.findMany()
	}

	async findByName (name: string) {
		return await prisma.specification.findFirst({ where: { name }})
	}
}