import app from 'app'

const PORT = process.env.PORT || 3333

const server = app.listen(PORT, () => {

	console.log('Server running')
})