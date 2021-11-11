import csvParse from 'csv-parse'

import fs from 'fs'

export class ImportCategoryService {
	store (file: Express.Multer.File) {
		const stream = fs.createReadStream(file.path)

		const parseFile = csvParse()

		stream.pipe(parseFile)

		parseFile.on('data', async row => {
			console.log(row)
		})
	}
}