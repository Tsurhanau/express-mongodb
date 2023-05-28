import { Request, Response } from 'express';
import { createUser, getUserById, getUsers, removeUser, updateUser } from './userController';
import { UserService } from '../service/user';

jest.mock('./../service/user', () => ({
    UserService: jest.fn().mockImplementation(() => ({
      getUsers: jest.fn().mockResolvedValue(['user1', 'user2']),
      getUserById: jest.fn().mockResolvedValue({ id: 123, name: "John" }),
      createUser: jest.fn().mockResolvedValue({ id: 123, login: "johnDoe", age: 25, isDeleted: false }),
      updateUser: jest.fn().mockResolvedValue({ id: 123, login: "johnDoe1", age: 25, isDeleted: false }),
      removeUser: jest.fn().mockResolvedValue({ id: "123", name: "John" })
    })),
}));

describe('UserController', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send users when getUsers is successful', async () => {

    req = {} as Request;

    const mockUsers = ['user1', 'user2'];
    
    await getUsers(req as Request, res as Response);

    expect(res.send).toHaveBeenCalledWith(mockUsers);
    expect(res.status).not.toHaveBeenCalled();

  });

  it("should get user by ID and send it in the response", async () => {
    req = {
      params: {
        id: 123,
      },
    } as unknown as Request;

    const mockUser = { id: 123, name: "John" };

    await getUserById(req, res);

    expect(res.send).toHaveBeenCalledWith(mockUser);
  });

  it("should create a user and send it in the response", async () => {
    req = {
      body: {
        login: "johnDoe",
        password: "password123",
        age: 25,
        isDeleted: false,
      },
    } as Request;

    const mockUser = { id: 123, login: "johnDoe", age: 25, isDeleted: false };

    await createUser(req, res);

    expect(res.send).toHaveBeenCalledWith(mockUser);
  });

  it("should update a user and send it in the response", async () => {
    req = {
      body: {
        login: "johnDoe1",
        password: "password123",
        age: 25,
        isDeleted: false,
      },
      params: {
        id: 123,
      },
    } as unknown as Request;

    const mockUser = { id: 123, login: "johnDoe1", age: 25, isDeleted: false };

    await updateUser(req, res)

    expect(res.send).toHaveBeenCalledWith(mockUser);
  })

  it("should remove a user and send it in the response", async () => {
    req = {
      params: {
        id: 123,
      },
    } as unknown as Request;

    const mockUser = { id: "123", name: "John" };

    await removeUser(req, res)
    
    expect(res.send).toHaveBeenCalledWith(mockUser);
  })

});
