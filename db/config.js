const mongoose = require('mongoose');



const dbConnection = async() => {

	try {
		await mongoose.connect(`${process.env.DB_CNN_PTA}${process.env.dbPass}${process.env.DB_CNN_PTb}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex : true
		});
	
		console.warn('DB Online')
	} catch (error) {
		console.log(error)
		throw new Error('Error a la hora de inicializar la base de datos')
	}
}


module.exports = {
	dbConnection
}