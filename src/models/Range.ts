import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Range Schema for TypeScript.
 * @param userId:string
 * @param name:string
 */

type Color = {
  name: string
  color: string
}

export interface IRange extends Document {
  userId: string;
  name: string;
  colors: Color[]
  createdAt: Date;
  updatedAt: Date;

}

const rangeSchema: Schema = new Schema(
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
    colors: [
      {
        name: String,
        color: String
      }
    ],
    hands: [
      {
        combo: String,
        colorId: String
      }
    ]
},
{
  timestamps: true
});



const Range = model<IRange>("Range", rangeSchema);

export default Range;
