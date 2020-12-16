import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const lessonSchema = new Schema({
  name: {
    type: String,
    default: ""
  },

});

lessonSchema.plugin(mongoosePaginate);
export default mongoose.model("Lesson", lessonSchema);

