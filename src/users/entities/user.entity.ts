class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    shifts: number[];
    assignment: string;

    constructor(user: {
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        shifts?: number[];
        assignment: string;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.shifts = user.shifts || [];
        this.assignment = user.assignment;
    }
}
export default User


