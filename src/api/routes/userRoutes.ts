import { Router } from "express";
import {
	getUserById,
	createUser,
	updateUser,
	getAutoSuggestUsers,
	removeUser
} from "../controllers/userController";

export const router: Router = Router();

router.route("/").post(createUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(removeUser);
router.route("/auto-suggest/:limit/:subStr").get(getAutoSuggestUsers);