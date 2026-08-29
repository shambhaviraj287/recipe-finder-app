import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addFavorite, getFavorites, deleteFavorite } from "../controllers/favorite.controller.js";

const router = Router();

router.use(verifyJWT); // all routes below require login

router.route("/").post(addFavorite);
router.route("/").get(getFavorites);
router.route("/:id").delete(deleteFavorite);

export default router;