import { Injectable } from '@nestjs/common';

export type User = {
    name: string;
    role: 'soldier' | 'commander';
    password: string | null;
}

@Injectable()
export class UsersService {
    public users: User[] = []

    async getAllUsers() {
        return this?.users;
    }

    async findOne(name: string) {
        const user = this.users.find(user => user.name === name)
        return user
    }
    async createUser(user: User) {
        const newUser = { name: user.name, role:"soldier", password: user.password }
        // this.users.push(newUser)
        return newUser

    }

}
