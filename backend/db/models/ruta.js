import mongoose from "../connect.js";

const Schema = mongoose.Schema;

const RutaSchema = new Schema(
  {
    userName: { type: String, required: true },
    difficulty: { type: String, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: String },
    distance: { type: Number, require: true },
    slopePositive: { type: Number, require: false },
    slopeNegative: { type: Number, require: false },
    maximumHeight: { type: Number, require: false },
    minimunHeight: { type: Number, require: false },
    lat: { type: String, required: true },
    lon: { type: String, required: true },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    calification: [
      {
        value: {
          type: Number,
          required: false,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Rute = mongoose.model("Ruta", RutaSchema);
export default Rute;
