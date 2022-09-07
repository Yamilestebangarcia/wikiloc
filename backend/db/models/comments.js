import mongoose from "../connect.js";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    rute: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ruta" }],
    autor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comments = mongoose.model("Comments", CommentSchema);
export default Comments;
