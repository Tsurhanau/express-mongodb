import { UserModel } from "../models/UserModel";

export class UserService {

    getUserById = async (id: string) => { 
        return UserModel.findById(id);
    }

    getUsers = async () => {
        return UserModel.find();
    }

    createUser = async (login: string, password: string, age: number, isDeleted: boolean) => {
        const isUserLoginExist = await this.checkUserExist(login);

        if (isUserLoginExist) {
            return Promise.reject({ error: "Login already exists" });
        } 

        const user = new UserModel({ login, password, age, isDeleted });
        return user.save();
    }

    updateUser = async (id: string, login: string, password: string, age: number) => {
        return UserModel.findByIdAndUpdate(id, { login, password, age }, { new: true });
    }

    removeUser = async (id: string) => {
        return UserModel.findByIdAndDelete(id);
    }

    checkUserExist = async (login: string) => {
        return UserModel.findOne({ login: login });
    }
}