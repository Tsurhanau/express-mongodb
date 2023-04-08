import { Request, Response } from "express";
import { mockData } from "../../data/mockData";
import { User } from "../../models/UserModel";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { schema } from "../../utils/validate";

// @desc GET User By ID
// @route GET /users/id

export const getUserById = (req: Request, res: Response) => {
	const userID = req.params.id;
	const foundUser = mockData.find((user) => user.id === userID);
	res.json({ user: foundUser });
};

// @desc CREATE User
// @route POST /users

export const createUser = async (req: Request, res: Response) => {
	const { login, password, age, isDeleted }: User = req.body;

	// Validate Fields
	try {
		await schema.validateAsync(req.body);
	} catch (err: any) {
		return res.status(400).json({ error: `${err.message}` });
	}

	// Check Duplicate login
	const userExist = mockData.find((user) => user.login === login);

	if (!userExist) {
		try {
			// Hash User Password
			const hashedPwd: string = await bcrypt.hash(password, 10);

			// Create new UUID
			const uuid: string = uuidv4();

			// Push User
			mockData.push({
				id: uuid,
				login: login,
				password: hashedPwd,
				age: age,
				isDeleted: isDeleted
			});

			return res.status(201).json({ message: `User: ${login} created` });
		} catch (err: any) {
			return res.status(400).json({ Error: `${err.message}` });
		}
	} else {
		return res.status(409).json({ message: "User Exist" });
	}
};

// @desc UPDATE User
// @route PATCH /users/id

export const updateUser = async (req: Request, res: Response) => {
	const userID: string = req.params.id;
	const { login, password, age } = req.body;

	// Validate Fields
	try {
		await schema.validateAsync(req.body);
	} catch (err: any) {
		return res.status(400).json({ error: `${err.message}` });
	}

	const foundUser = mockData.find((user) => user.id === userID);

	if (foundUser) {
		try {
			foundUser.login = login;
			foundUser.password = await bcrypt.hash(password, 10);
			foundUser.age = age;
		} catch (err: any) {
			return res.status(400).json({ Error: `${err.message}` });
		}
	} else {
		return res.status(400).json({ Error: `User ${login} not found` });
	}
};

// @desc REMOVE user
// @route DELETE /users/id

export const removeUser = async (req: Request, res: Response) => {
	const userID: string = req.params.id;
	const foundUser = mockData.find((user) => user.id === userID);
	if (foundUser) {
		foundUser.isDeleted = true;
		return res
			.status(200)
			.json({ message: `User ${foundUser.login} soft-deleted.` });
	} else {
		return res.status(400).json({ message: "User Not Found" });
	}
};

// @desc Auto-Suggest User
// @route GET /auto-suggest/limit/subString

export const getAutoSuggestUsers = (req: Request, res: Response) => {
	const { limit, subStr } = req.params;

	// Sort Callback
	const compareFn = (a: User, b: User) => {
		if (a.login < b.login) {
			return -1;
		}
		if (a.login > b.login) {
			return 1;
		}
		return 0;
	};

	// Shallow Copy mockData
	const sortedData = [...mockData].sort(compareFn);

	const result = sortedData
		.filter((element) => element.login.includes(subStr))
		.slice(0, parseInt(limit));

	if (result) {
		return res.status(200).json({ userList: result });
	} else {
		return res.status(400).json({ error: "Something went wrong" });
	}
};