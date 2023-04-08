import { User } from "../models/UserModel";

export const mockData: User[] = [
	{
		id: "1",
		login: "JohnDoe",
		password: "john1234",
		age: 26,
		isDeleted: false
	},
	{
		id: "2",
		login: "JaneDoe",
		password: "jane1234",
		age: 20,
		isDeleted: false
	},
	{
		id: "3",
		login: "JackNich",
		password: "jack1234",
		age: 42,
		isDeleted: false
	},
	{
		id: "4",
		login: "NewmanSmith",
		password: "new1234",
		age: 22,
		isDeleted: false
	},
	{
		id: "5",
		login: "KateSmith",
		password: "kate1234",
		age: 52,
		isDeleted: false
	}
];