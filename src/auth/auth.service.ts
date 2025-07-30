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

    async login(name: string, password: string): Promise<object | string | null> {
        let token: string;
        const user = await this.userService.findOne(name);
        console.log("🚀 ~ login ~ user:", user)
        if (user) {
            try {
                const isVerify = await this.verifyPassword(password, user.password || "")
                if (!isVerify) {
                    return "password not verify"
                }
                token = await this.createToken(user)
                if (user?.role === "soldier") {
                    if (token) {
                        return { msg: "success create token",token: token }
                    }
                }
                else if (user?.role === "commander") {
                    if (token) {
                        return { msg: "success create token",token: token }
                    }
                }


            } catch (error) {
                console.log("🚀 ~ login ~ error:", error)
            }

        }
        throw new UnauthorizedException();
    }

    async register(name: string, password: string,) {
        try {
            const users = await this.userService.getAllUsers()
            const user = users.find(u => u.name == name && u.password === password);
            if (user) {
                return "user allready exist"
            }
            else {
                const hash = await this.hashPassword(password, 10)
                users.push({ name: name, role: 'soldier', password: hash })
                return `register ${name} successfully , hash:${hash}`
            }
        } catch (error) {
            console.log({ msg: "register faild", error });
        }
        return null
    }

    async createToken(user: User): Promise<string> {
        const payload = { name: user.name, role: user.role };
        return await this.jwtService.signAsync(payload)
    }




    // hash password
    async hashPassword(password: string, salt: number): Promise<string | null> {
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
            console.log("🚀 ~ verifyPassword ~ error:", error)
        }
    }
}
