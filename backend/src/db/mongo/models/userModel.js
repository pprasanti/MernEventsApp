import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import passportLocalMongoose from "passport-local-mongoose"
import sign from "jsonwebtoken";
import AppError from "../../../utils/AppErrors.js";
import Role from "./roleModel.js";
import Jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Name cannot be blank'],

        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Email cannot be blank'],
            unique: true
        },
        username: {
            type: String,
            // required: [true, 'Username cannot be blank'],
            // unique: true
        },
        roles: [
            {
                // type: mongoose.Schema.Types.ObjectId,
                type: String,
                // ref: "Role"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password cannot be blank'],
        },
        phone: {
            type: Number,
            required: [true, 'Phone cannot be blank'],
            length: [10, 'Phone No. must be 10 digit']
        },
        address: [{
            _id: { id: false },
            street: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
        }],
        img: {
            type: String,
        },
        status: {
            type: Number,
            default: 1
        }
    }
)

userSchema.plugin(passportLocalMongoose)

userSchema.methods.getUsersByType = ((cb) => {
    return mongoose.model('User').find({ type: this.type }, cb)
})

userSchema.methods.createUser = ((user) => {
    return mongoose.model('User').insertMany([{ user }])
})

userSchema.statics.findByType = (type) => {
    return this.find({ type: new RegExp(type, 'i') })
}

userSchema.statics.findAndValidate = async function (email, password) {
    const foundUser = await this.findOne({ email })
        .populate("roles", "-__v")
        .then(async (user) => {
            const passwordIsValid = await bcrypt.compare(password, user.password)
            if (!passwordIsValid) {
                throw new AppError(401, 'Invalid Password!')
            }

            var token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].toUpperCase());
            }

            return ({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        })
        .catch(err => { throw err });

    return foundUser
}

userSchema.virtual("fullName")
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    })
    .set(function () {
        return `${this.firstName} ${this.lastName}`
    })

userSchema.pre('save', async function (next) {
    console.log("Pre Save - Password encrypted")
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12)

    if (this.roles.length > 0) {
        console.log("66666 user : " + this.roles)
        Role.find({ name: { $in: this.roles } },
            (err, roles) => {
                if (err) {
                    throw new AppError(500, JSON.stringify(err));
                }
                this.roles = roles.map(role => role._id);
            }
        );
    } else {
        console.log("5555 user.roles : " + this.roles.length)
        Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
                throw new AppError(500, JSON.stringify(err));
            }
            this.roles = [role._id];
        });
    }

    next()
})

userSchema.post('save', async function () {
    console.log("Post Save!!")
})

const User = mongoose.model('User', userSchema);

export default User

