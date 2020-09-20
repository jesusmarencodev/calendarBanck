const { response } = require('express');
const bcrypt = require('bcryptjs');
const UsuarioModel = require('../models/UsuarioModel');
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middlewares/validar-jwt');


const crearUsuario = async( req, res = response ) => {

	const { email, password } = req.body;

	try {

		let usuario = await UsuarioModel.findOne({ email });

		if( usuario ) return res.status(400).json({ ok: false, msg: 'usuario ya existe'})

		usuario = new UsuarioModel( req.body );

		//Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync( password, salt );

		await usuario.save();

		//Generar JWT Token
		const token =  await generarJWT( usuario._id, usuario.name )
	
		res.status(201).json({
			ok  : true,
			uid : usuario.id,
			name : usuario.name,
			token
		})
	} catch (error) {
		res.status(500).json({
			ok  : false,
			msg : 'Contacte al administrador',
		})
	}

}

const loginUsuario = async( req, res = response ) => {

	const { email, password } = req.body;

	try {
		let usuario = await UsuarioModel.findOne({ email });
		if( !usuario ) return res.status(400).json({ ok: false, msg: 'usuario y contraseña no son correctos1'})

		//confirmar los passwords
		const validPassword = bcrypt.compareSync( password, usuario.password);
		if( !validPassword ){
			return res.status(400).json({ ok : false, msg: 'usuario y contraseña no son correctos2' });
		}

		//Generar JWT Token
		const token =  await generarJWT( usuario._id, usuario.name )


		return res.status(200).json({ ok:true, uid : usuario._id, name : usuario.name, token:token })

		
	} catch (error) {
		
	}

	res.status(200).json({
		ok  : true,
		msg : 'login',
		email,
		password
	});
}

const revalidarToken = async( req, res = response ) => {

	const { uid, name } = req;

	//Generar JWT Token
	const token =  await generarJWT( uid, name );

	return res.status(200).json({
		ok  : true,
		token
	});
}



module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken
}