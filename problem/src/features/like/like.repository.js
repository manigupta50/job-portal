// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from 'mongoose';
import { likeSchema } from './like.schema.js';

const likeModel = mongoose.model('Like', likeSchema);

export const likeRepo = async (user_id, job_id, model) => {
  // Write your code here
  if(model === 'User') {
    try {
      const newLike = new likeModel({
        user: user_id,
        likeable: user_id,
        on_model: model
      });
      await newLike.save();
      return newLike;
    } catch(err) {
      console.log(err);
    }
  }

  if(model === 'Job') {
    try {
      const newLike = new likeModel({
        user: user_id,
        likeable: job_id,
        on_model: model
      });
      await newLike.save();
      return newLike;
    } catch(err) {
      console.log(err);
    }
  }
  
};
export const getLikesRepo = async (id, on_model) => {
  // Write your code here
  try {
    const like = await likeModel.findOne({ likeable: id, on_model: on_model });
    return like;
  } catch(err) {
    console.log(err);
  }
};
