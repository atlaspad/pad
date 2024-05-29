/*  backend/models/project.model.js
 *	2024 © Atlaspad Launchpad
 *  Yigid BALABAN <fyb@fybx.dev>
 */

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	projectId: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		minLength: 4,
		maxLength: 64,
		match: /^[a-zA-Z0-9]+$/
	},
	name: {
		type: String,
		minLength: 4,
		maxLength: 64,
		required: true
	},
	flair: {
		type: String,
		enum: ['presale', 'public', 'private', 'tba'],
		required: true
	},
	details: {
		type: Array
	},
	chain: {
		type: String,
		enum: ['mina', 'avax', 'eth'],
		required: true
	},
	description: {
		type: String,
		maxLength: 500000
	},
	parameters: Object,
	socials: {
		type: Map,
		of: mongoose.Schema.Types.Mixed,
		validate: {
			validator: function (value) {
				const allowedKeys = ['discord', 'github', 'twitter'];
				return Object.keys(value).every((key) => allowedKeys.includes(key));
			},
			message: (props) => `${props.value} contains invalid keys`
		}
	}
});

projectSchema.pre('save', function (next) {
	this.validate()
		.then(() => next())
		.catch((err) => next(err));
});

projectSchema.pre('findOneAndUpdate', function (next) {
	const update = this.getUpdate();

	this.model
		.findOne(this.getQuery())
		.then((doc) => {
			Object.keys(update).forEach((key) => (doc[key] = update[key]));
			return doc.validate();
		})
		.then(() => next())
		.catch((err) => next(err));
});

module.exports = mongoose.model('project', projectSchema);
