import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, 'Password must be at least 6 characters long']
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
    waist: {
        type: Number
    },
    hip: {
        type: Number,
    },
    healthGoal: {
        type: String,
        enum: ['Giảm cân', 'Tăng cơ', 'Duy trì cân nặng', 'Cải thiện sức khỏe']
    },
    sleep: {
        type: Number
    },
    age: {
        type: Number,
    },
    activityLevel: {
        type: String
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