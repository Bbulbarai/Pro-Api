import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const transactionSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  sublesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sublesson"
  },
  amount: {
      type: Number,
      default: 0,
  },
  value: {
      type: String,
      default: ""
  }
});

transactionSchema.plugin(mongoosePaginate);
export default mongoose.model("Transaction", transactionSchema);

