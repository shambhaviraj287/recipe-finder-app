import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Favorite } from "../models/favorite.model.js";

const addFavorite = asyncHandler(async (req, res) => {
    const { recipeMarkdown } = req.body;

    if (!recipeMarkdown?.trim()) {
        throw new ApiError(400, "Recipe content is required");
    }

    const favorite = await Favorite.create({
        user: req.user._id,
        recipeMarkdown
    });

    return res.status(201).json(
        new ApiResponse(201, favorite, "Recipe saved to favorites")
    );
});

const getFavorites = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, favorites, "Favorites fetched successfully")
    );
});

const deleteFavorite = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const favorite = await Favorite.findOneAndDelete({ _id: id, user: req.user._id });

    if (!favorite) {
        throw new ApiError(404, "Favorite not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Favorite removed")
    );
});

export { addFavorite, getFavorites, deleteFavorite };