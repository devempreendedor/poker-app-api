import { Document, Model, model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'

/**
 * Interface to model the User Schema for TypeScript.
 * @param name:string
 * @param email:string
 * @param password: string
 * @param createdAt:Date
 * @param updatedAt:Date
 */
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  doesPasswordMatch: any
}


interface IUser extends Model<UserDocument> {
  doesEmailExist: (email: string) => Promise<boolean>
}

const userSchema: Schema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},
{
  timestamps: true
});

userSchema.statics.doesEmailExist = async function (
  email: string
): Promise<boolean> {
  const user = await this.findOne({ email })
  return Boolean(user)
}

/* eslint-disable-next-line func-names */
userSchema.methods.doesPasswordMatch = async function (
  password: string
): Promise<boolean> {
  const user = this

  return bcrypt.compare(password, user.password)
}

/* eslint-disable-next-line func-names */
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})


export default model<UserDocument, IUser>('User', userSchema)
