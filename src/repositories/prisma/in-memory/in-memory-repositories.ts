import { User } from "@prisma/client";
import { UsersRepository } from "../user-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(userId: string) {
    const user = this.items.find((item) => item.id === userId)

    if(!user) {
        return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if(!user) {
        return null;
    }

    return user;
  }

  async create(data: {
    name: string;
    email: string;
    password_hash: string;
  }): Promise<User> {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
    };

    this.items.push(user)
    return user
  }
}

