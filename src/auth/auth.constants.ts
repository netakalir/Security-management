import { config } from "dotenv"
config()

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export const jwtConstants = {
    secret: process.env.JWT_SECRET
};