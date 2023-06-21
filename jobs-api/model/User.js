require('dotenv').config();
const { Schema, model } = require('mongoose');
const { hash, genSalt, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, `Please provide name`],
			maxlength: 50,
			minlength: 3,
		},
		email: {
			type: String,
			required: [true, `Please provide email`],
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				`Please provide a valid email`,
			],
			unique: true,
		},
		password: {
			type: String,
			require: [true, `Please provide password`],
			minlength: 6,
		},
	},
	{ timestamps: true },
);

UserSchema.pre('save', async function (next) {
	// only has the password if it has been modified (or is new)
	// if(!user.isModified('password'))return next()

	// generate a salt
	const salt = await genSalt(10);

	this.password = await hash(this.password, salt);
	next();
});

UserSchema.methods.createToken = function () {
	return sign(
		{ userId: this._id, userName: this.name },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRY },
	);
};

UserSchema.methods.confirmPassword = async function (clientPassword) {
	return await compare(clientPassword, this.password);
};
module.exports = model('User', UserSchema);
