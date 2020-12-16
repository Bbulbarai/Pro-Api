import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const sublessonSchema = new Schema({
  lessonid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
  },
  name: {
    type: String,
    default: ""
  },
  level: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    default: 0
  }
});

sublessonSchema.plugin(mongoosePaginate);
export default mongoose.model("Sublesson", sublessonSchema);

