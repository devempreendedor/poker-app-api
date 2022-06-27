import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Folder Schema for TypeScript.
 * @param userId:string
 * @param name:string
 */
export interface IFolder extends Document {
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

}

const folderSchema: Schema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
},
{
  timestamps: true
});



const Folder = model<IFolder>("Folder", folderSchema);

export default Folder;
