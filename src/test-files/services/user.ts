import { CreateUserDto } from '../../model/user/user';
import { User } from '../../model/user/user.i';

export const createUserDto = new CreateUserDto();
createUserDto.email = 'dadie.emilin@gmail.com';
createUserDto.name = 'Emilin';
createUserDto.password = 'toto';
createUserDto.address = '14 rue de Mulhouse';

export const userMock: User = {
    id : 1,
    name : 'Emilin',
    address: '',
    email: 'dadie.emilin@gmail.com',
    accounts: [],
};
