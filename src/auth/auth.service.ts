import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt"
import { config } from "dotenv"
config()
import rl from "readline-sync"



@Injectable()
export class AuthService {
    constructor(public userService: UsersService, private jwtService: JwtService) { }

    async login(name: string, password: string): Promise<string|null> {
        const user = await this.userService.findOne(name);
        if (user && user?.password === password) {
            try {
                if (user?.role === "soldier") {
                //create token
                
                const token = await this.createToken(user)
                if (token) {
                    return `login ${user.role} successfully! token: ${token.token}`;
                }
            }
            else if (user?.role === "commander") {
                //create token
                const token = await this.createToken(user)
                if (token) {
                    return `login ${user.role} successfully${token.token}`;
                }
            }
            } catch (error) {
                console.log(error);
            }
            
        }
        throw new UnauthorizedException();
    }

    register(name: string, role: "soldier" | "commander", password: string,): string {
        const users = this.userService.getAllUsers()
        const user = users.find(u => u.name == name && u.role === role && u.password === password);
        if (user) {
            return "user allready exist"
        }
        else {
            const newUser = { name: name, role: role, password: password }
            users.push(newUser)
            return `register ${newUser.name} successfully`
        }
        // return "register faild" convert to try/cetch
    }

    async createToken(
        user: User
    ): Promise<{ token: string }> {
        const payload = { name: user.name, role: user.role };
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }


    // verify token: token verification against JWT_SECRET
    // async verifyToken(token: string) {
    //     try {
    //         if (!process.env.JWT_SECRET) {
    //             throw new Error('JWT_SECRET is not defined in environment variables');
    //         }

    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         return decoded;
    //     } catch (error) {
    //         console.error({ msg: "cannot verify token", error });
    //         return null;
    //     }
    // }



    // hash password
    async hashPassword(password: string, salt: number | string) {
        let hash: string;
        try {
            hash = await bcrypt.hash(password, salt)
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
