import { Router } from "express";
import {
	getUserById,
	createUser,
	updateUser,
	removeUser,
	getUsers,
} from "../controllers/userController";

export const router: Router = Router();

router.route("/")
	.post(createUser)
	.get(getUsers);

router.route("/:id")
	.get(getUserById)
	.put(updateUser)
	.delete(removeUser);