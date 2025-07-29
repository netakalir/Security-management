import { Injectable } from '@nestjs/common';

export interface User {
    name: string;
    role: "soldier" | "commander";
    password: string |null;
}

@Injectable()
export class UsersService {
    public users: User[] = [{ name: "neta", role: "soldier", password: "1234" }]
    getAllUsers() {
        return this?.users;
    }

    async findOne(name:string){
        const user = this.users.find(user => user.name === name)
        return user
    }

}
