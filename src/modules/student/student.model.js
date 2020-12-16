import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const chosenLessons = new Schema(
  {
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: "schedule" }
  },
  {
    _id: false,
  }
)


const studentSchema = new Schema({
  lastname: {
    type: String,
    default: ""
  },
  firstname: {
    type: String,
    default: ""
  },
  classid: {
    type: String,
    default: ""
  },
  accountid: {
    type: String,
    default: "",
  },
  birth: {
    type: Date,
    default: null
  },
  email: {
      type: String,
      default: "",
  },
  password: {
      type: String,
      default: "",
  },
  img: {
      type: String,
      default: "",
  },
  chosenLessons: [{ type: mongoose.Schema.ObjectId, ref: "schedule" }]
});

studentSchema.plugin(mongoosePaginate);
export default mongoose.model("Student", studentSchema);

