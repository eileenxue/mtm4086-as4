var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

/*User schema attributes and characteristics/fields*/
var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,

    profile: {
        name: {
            type: String,
            default: ''
        },
        picture: {
            type: String,
            default: ''
        }
    },

    address: String,
    history: [{
        date: Date,
        paid: {
            type: Number,
            default: 0
        }
        //item: {type: Schema.Types.ObjectId, ref: ''}
    }]

});


/*encrypt password before saving*/
UserSchema.pre('save', function (next) {
    /*referring to user schema*/
    var user = this;
    /*if it's not modified, go to next*/
    if (!user.isModified('password')) return next();
    /*generate 10 different data and salt means get results*/
    bcrypt.genSalt(10, function (err, salt) {
        /*if there's error, return error message, and if the user password is the hash, go to next*/
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/*
compare passwords with existing and stored*/
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

/*export whole file so that other files can use the UserSchema*/
module.exports = mongoose.model('User', UserSchema);