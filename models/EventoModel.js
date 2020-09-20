const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
	title : {
		type : String,
		required : true,
	},
	notes : {
		type : String,
	},
	start : {
		type : Date,
		required : true
	},
	end : {
		type : Date,
		required : true
	},
	user : {
		type : Schema.Types.ObjectId,
		ref : 'Usuario',
		required : true
	}
});

//esto lo uso para que me mueste el _id como id y elminar el campo version (__v)
/* EventoSchema.method('toJSON', function(){
	const { __c, _id, ...object } = this.toObject();

	object.id = _id;
	return object;
})
 */

module.exports = model('Evento', EventoSchema);