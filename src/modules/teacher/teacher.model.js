import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const teacherSchema = new Schema({
  lastname: {
    type: String,
    default: ""
  },
  firstname: {
    type: String,
    default: ""
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
  type: {
    type: String,
    default: "TEACHER"
  },
  chosenLessons: [{ type: mongoose.Schema.ObjectId, ref: "schedule" }]
});

teacherSchema.plugin(mongoosePaginate);
export default mongoose.model("Teacher", teacherSchema);

