import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { schema } from "../utils/validate";

export const getUserById = (req: Request, res: Response) => { 
	UserModel
		.findById(req.params.id)
		.then((user: any) => { 
			console.log(user)
			res.send(user) 
		})
		.catch((err: any) => { res.status(400).send(err) });
};

export const getUsers = (req: Request, res: Response) => {
	UserModel
		.find()
		.then((users: any) => { res.send(users) })
		.catch((err: any) => { res.status(400).send(err) });
}

export const createUser = async (req: Request, res: Response) => {

	const { login, password, age, isDeleted } = req.body;


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
};

export const updateUser = async (req: Request, res: Response) => {
	const { login, password, age } = req.body;

	UserModel
		.findByIdAndUpdate(req.params.id, { login, password, age }, { new: true })
		.then((user: any) => { res.send(user) })
		.catch((err: any) => { res.status(400).send(err) });
};

export const removeUser = async (req: Request, res: Response) => {

	UserModel
		.findByIdAndDelete(req.params.id)
		.then((user: any) => { res.send(user) })
		.catch((err: Error) => { res.status(400).send(err) });
};
