const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

	const token = req.header('x-token');

	//console.log(token)

	if( !token ) {
		return res.status(401).json({ ok : false, msg : 'No existe token en la peticion'});
	}

	try {

		const { uid, name } = jwt.verify(
			token,
			process.env.SECRECT_JWT_SEED
		);

		req.uid  = uid;
		req.name = name;
	
	} catch (error) {
		
		return res.status(401).json({ ok : false, msg : 'No esta autenticado'});
	}

	next();

}

module.exports = {
	validarJWT
}