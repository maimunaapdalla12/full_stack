
import mongoose, { Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    userName: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate: [{
            validator: value => validator.isStrongPassword(value),
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }]
    }
}, {
    timestamps: true
});






userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Method to compare passwords
  userSchema.methods.comparePassword = async function(givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
    

  };

const User = mongoose.model('User', userSchema);
export default User;
