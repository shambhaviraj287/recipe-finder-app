import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        recipeMarkdown: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const Favorite = mongoose.model("Favorite", favoriteSchema);