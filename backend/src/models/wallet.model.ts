import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wallet_name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Wallet", walletSchema);