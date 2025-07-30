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

}
