
const EventModel = require('../models/EventoModel');



const getEventos = async( req, res ) => {

	try {
		const eventos = await EventModel.find()
																		.populate('user', 'name');

		return res.status(200).json({ ok : true, eventos });
		
	} catch (error) {
		console.log(error)
	}


	
}

const crearEvento = async( req, res ) => {

	const evento = new EventModel( req.body );

	try {
		evento.user = req.uid;
		const eventoGuardado = await evento.save();

		return res.status(201).json({ ok : true, evento : eventoGuardado });

	} catch (error) {
		return res.status(500).json({ ok : false, msg : 'Contacte al Administrador' })
	}

}

const actualizarEvento = async( req, res ) => {
	const eventoId = req.params.id;
	const { uid } = req;



	try {
		const evento = await EventModel.findById({ _id : eventoId })
																		.populate('user', 'name');
		
		if( !evento ) return res.status(404).json({ ok : false, msg : 'Evento no existe' });

		if( evento.user._id.toString() !== uid ){
			return res.status(401).json({ ok : false, msg : 'No tiene permisos para editar este elemento' });
		}

		const nuevoEvento = {
			...req.body,
			user : uid
		}

		const eventoActualizado = await EventModel.findByIdAndUpdate( eventoId, nuevoEvento, { new : true } );
		
		return res.status(200).json({ _id : uid, ok : true, evento : eventoActualizado });


	} catch (error) {
		console.log(error)
		return res.status(500).json({ ok : false, msg : 'Hable con el administrador' });
	}

}

const eliminarEvento = async( req, res ) => {
	const eventoId = req.params.id;
	const { uid } = req;

	try {
		const evento = await EventModel.findById({ _id : eventoId })
																		.populate('user', 'name');
		
		if( !evento ) return res.status(404).json({ ok : false, msg : 'Evento no existe' });

		if( evento.user._id.toString() !== uid ){
			return res.status(401).json({ ok : false, msg : 'No tiene permisos para borrar este elemento' });
		}

		await EventModel.findByIdAndDelete( eventoId );
		
		return res.status(200).json({ ok : true });


	} catch (error) {
		console.log(error)

		return res.status(500).json({ ok : false, msg : 'Hable con el administrador' });
	}
}

module.exports = {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento
}