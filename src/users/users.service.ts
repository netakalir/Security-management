import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    public users =[{name:"neta",role:"soldier",password:"1234"}]
    getAllUsers(){
        return this?.users;
    }

}
