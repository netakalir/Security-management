import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { config } from "dotenv"
config()
import rl from "readline-sync"



@Injectable()
export class AuthService {
    constructor(public userService: UsersService, private jwtService: JwtService) { }

    async login(name: string, password: string): Promise<string | null> {
        const user = await this.userService.findOne(name);
        if (user && user?.password === password) {
            try {
                if (user?.role === "soldier") {
                    const token = await this.createToken(user)
                    if (token) {
                        return `login ${user.role} successfully! token: ${token.token}`;
                    }
                }
                else if (user?.role === "commander") {
                    const token = await this.createToken(user)
                    if (token) {
                        return `login ${user.role} successfully! token: ${token.token}`;
                    }
                }
            } catch (error) {
                console.log(error);
            }

        }
        throw new UnauthorizedException();
    }

    async register(name: string, role: "soldier" | "commander", password: string,) {
        try {
            const users = this.userService.getAllUsers()
            const user = users.find(u => u.name == name && u.role === role && u.password === password);
            if (user) {
                return "user allready exist"
            }
            else {
                const hash = await this.hashPassword(password, 10)
                const newUser = { name: name, role: role, password: hash }
                users.push(newUser)
                return `register ${newUser.name} successfully , hash:${hash}`
            }
        } catch (error) {
            console.log({ msg: "register faild", error });
        }
        return null
    }

    async createToken(
        user: User
    ): Promise<{ token: string }> {
        const payload = { name: user.name, role: user.role };
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }



    // hash password
    async hashPassword(password: string, salt: number): Promise<string|null> {
        try {
            const hash = await bcrypt.hash(password, salt)
            return hash;
        } catch (error) {
            console.log({ msg: "cannt hashPassword ", error });
        }
        return null
    }


    // verify password
    async verifyPassword(password: string, hash: string) {
        try {
            const status = await bcrypt.compare(password, hash)
            if (!status) {
                return false
            }
            return true
        } catch (error) {
            console.log(error);
        }
    }
}
