import { getManager } from 'typeorm';
import { UserEntity } from '../../entity/user/user';
import { CreateUserDto } from '../../model/user/user';
import { User } from '../../model/user/user.i';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

export class UserService {

    constructor() {
        dotenv.config();
    }
    async checkIfEmailExist(email: string): Promise<boolean> {
        const users = await this.getUserByEmail(email);
        if (users) {
            return true;
        }
        return false;
    }
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const emailExist = await this.checkIfEmailExist(createUserDto.email);
        if (emailExist) {
            throw new Error('Email already exist!');
        }
        createUserDto.password = await this.cryptPassword(createUserDto.password);
        const createUserResponse = await getManager().getRepository(UserEntity).save(createUserDto);
        delete createUserResponse.password;
        return createUserResponse;
    }
    async cryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, Number(process.env.SALT)).then((hash) => hash);
    }
    async comparePassword(password: string, hashpassword: string): Promise<boolean> {
        const match = await bcrypt.compare(password, hashpassword);
        if (match) {
            return true;
        }
        return false;
    }
    async logUser(email: string, password: string): Promise<User> {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error('Email or password is wrong!');
        }
        const canLogin = await this.comparePassword(password, user.password);
        if (canLogin) {
            delete user.password;
            return user;
        }
        throw new Error('Email or password is wrong!');
    }

    async getUserByEmail(email: string): Promise<any> {
        return await getManager().getRepository(UserEntity).findOne({ email });
    }
}
