import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Tên tài khoản là bắt buộc"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email là bắt buộc"],
        unique: true,
        lowercase: true,
        trim: true
    },
    image: {
        type: String,
        default: "https://w7.pngwing.com/pngs/195/539/png-transparent-account-user-person-profile-people-outline-style-icon.png"
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, 'Mật khẩu tối thiểu 6 kí tự!']
    },
    clerkId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "USER"
    },
    gender: {
        type: String,
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    focusBodyPart: [
        {
            type: String
        }
    ],
    healthGoal: {
        type: String
    },
    level: {
        type: String,
    },
    bmr: {
        type: String
    },
    orm: {
        type: Number,
    },
    tdee: {
        type: Number
    }
})


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

//tk: nam
//mk: 123456

// req mk: 1234567 => invalid credentials

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema);

export default User