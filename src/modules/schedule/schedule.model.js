import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const scheduleSchema = new Schema({
  day: {
    type: String,
    default: ""
  },
  starttime: {
    type: String,
    default: ""
  },
  endtime: {
    type: String,
    default: ""
  },
  sublessonid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sublesson"
  },
});

scheduleSchema.plugin(mongoosePaginate);
export default mongoose.model("schedule", scheduleSchema);

