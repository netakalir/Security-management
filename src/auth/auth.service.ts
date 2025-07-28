import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import rl from "readline-sync"

@Injectable()
export class AuthService {
    constructor(public userService: UsersService) { }

    login(name: string, role: string): string {
        const users = this.userService.getAllUsers();
        const user = users.find(u => u.name == name && u.role === role);
        if (user && user?.role === "soldier") {
            //create token
            return `login ${user.role} successfully`;
        }
        else if (user && user?.role === "commander") {
            //create token
            return `login ${user.role} successfully`;
        }
        return "login faild"
    }

    register(name: string, role: string, password: string,): string {
        const users = this.userService.getAllUsers()
        const user = users.find(u => u.name == name && u.role === role && u.password === password);
        if (user) {
            return "user allready exist"
        }
        else{
            const newUser = {name:name,role:role,password:password}
            users.push(newUser)
            return `register ${newUser.name} successfully`
        }
        // return "register faild" convert to try/cetch
    }
}
