import { Router } from "express";
import {
	getUserById,
	createUser,
	updateUser,
	removeUser,
	getUsers,
} from "../controllers/userController";
import { validateBody } from "../middleware/validate-body";

export const router: Router = Router();

router.route("/")
	.post(validateBody, createUser)
	.get(getUsers);

router.route("/:id")
	.get(getUserById)
	.put(validateBody, updateUser)
	.delete(removeUser);