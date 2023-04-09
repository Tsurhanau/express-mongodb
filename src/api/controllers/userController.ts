import { Request, Response } from "express";
import { UserModel } from "../../models/UserModel";
import { schema } from "../../utils/validate";

// @desc GET User by ID
// @route GET /users/id

export const getUserById = (req: Request, res: Response) => { 
	try {
		UserModel
		.findById(req.params.id)
		.then((user: any) => { res.send(user) })
		.catch((err: any) => { res.status(400).send(err) });
	} catch (err: any) {
		return res.status(400).json({ error: `${err.message}` });
	}
};

// @desc GET Users
// @route GET /users

export const getUsers = (req: Request, res: Response) => {
	try {
		UserModel
			.find()
			.then((users: any) => { res.send(users) })
			.catch((err: any) => { res.status(400).send(err) });
	} catch (err: any) {
		return res.status(400).json({ error: `${err.message}` });
	}
}

// @desc CREATE User
// @route POST /users

export const createUser = async (req: Request, res: Response) => {

	const { login, password, age, isDeleted } = req.body;

	try {
		await schema.validateAsync(req.body);

		const isUserLoginExist = await UserModel.findOne({ login: login }).select("login").lean();

		if (isUserLoginExist) {
			return res.status(400).json({ error: "Login already exists" });
		}
		
		const user = new UserModel({ login, password, age, isDeleted });
	
		user
			.save()
			.then((user: any) => { res.send(user) })
			.catch((err: any) => { res.status(400).send(err) });

	} catch (err: any) {
		return res.status(400).json({ error: `${err.message}` });
	}
};

// @desc UPDATE User
// @route PUT /users/id

export const updateUser = async (req: Request, res: Response) => {
	const { login, password, age } = req.body;

	try {
		UserModel
			.findByIdAndUpdate(req.params.id, { login, password, age }, { new: true })
			.then((user: any) => { res.send(user) })
			.catch((err: any) => { res.status(400).send(err) });

	} catch (err: any) {
		return res.status(400).json({ error: `${err.message}` });
	}
};

// @desc REMOVE user
// @route DELETE /users/id

export const removeUser = async (req: Request, res: Response) => {

	try {	
		UserModel
			.findByIdAndDelete(req.params.id)
			.then((user: any) => { res.send(user) })
			.catch((err: Error) => { res.status(400).send(err) });
	} catch (err: any) {
		return res.status(400).json({ error: `${err.message}` });
	}

};
