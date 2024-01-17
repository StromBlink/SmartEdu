const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true
    }
});

UserSchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    })
    next();
})

const User = mongoose.model('User', UserSchema)

module.exports = User;