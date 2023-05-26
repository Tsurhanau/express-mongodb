import { Request, Response } from "express";
import { UserService } from "../service/user";

const userService = new UserService();

export const getUserById = async (req: Request, res: Response) => { 

	userService.getUserById(req.params.id)
		.then((user: any) => { res.send(user) })
		.catch((err: any) => { res.status(400).send(err) });
};

export const getUsers = (req: Request, res: Response) => {

	userService.getUsers()
		.then((users: any) => { res.send(users) })
		.catch((err: any) => { res.status(400).send(err) });
}

export const createUser = async (req: Request, res: Response) => {

	const { login, password, age, isDeleted } = req.body;

	userService.createUser(login, password, age, isDeleted)
		.then((user: any) => { res.send(user) })
		.catch((err: any) => { res.status(400).send(err) });
};

export const updateUser = async (req: Request, res: Response) => {
	const { login, password, age } = req.body;

	userService.updateUser(req.params.id, login, password, age)
		.then((user: any) => { res.send(user) })
		.catch((err: any) => { res.status(400).send(err) });
};

export const removeUser = async (req: Request, res: Response) => {
	userService.removeUser(req.params.id)
		.then((user: any) => { res.send(user) })
		.catch((err: Error) => { res.status(400).send(err) });
};
