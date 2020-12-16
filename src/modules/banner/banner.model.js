import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const bannerSchema = new Schema({
  img: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: 0
  },
});

bannerSchema.plugin(mongoosePaginate);
export default mongoose.model("Banner", bannerSchema);

