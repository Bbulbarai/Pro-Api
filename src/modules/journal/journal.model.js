import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const journalSchema = new Schema({
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schedule"
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },
  isActive: {
      type: Boolean,
      default: true,
  },
  result: {
      type: String,
      default: ""
  }
});

journalSchema.plugin(mongoosePaginate);
export default mongoose.model("Journal", journalSchema);

