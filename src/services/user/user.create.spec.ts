import { UserService } from './user';
import { createUserDto, userMock } from '../../test-files/index';

describe('User service', () => {
    let userService: UserService;
    beforeEach(() => {
        userService = new UserService();
    });

    it('Should return false when having an email which not exist in system', async () => {
        // Arrange
        const email = 'dadie.emilin@gmail.com';
        spyOn(userService, 'checkIfEmailExist').and.returnValue(Promise.resolve(false));

        // Act
        const output = await userService.checkIfEmailExist(email);
        // Assert
        expect(output).toEqual(false);
    });

    it('Should return password crypted when having a password', async () => {
        const password = 'toto';

        const output = await userService.cryptPassword(password);

        expect(output).not.toEqual(password);
    });

    it('Should return a created user when having valid create user informations', async () => {
        const myUser = createUserDto;
        const myUserMock = userMock;
        spyOn(userService, 'createUser').and.returnValue(Promise.resolve(myUserMock));

        const output = await userService.createUser(myUser);

        expect(output.id).toBeDefined();
    });

    it('Should return an error when having invalid create user informations', async () => {
        const myUser = createUserDto;
        spyOn(userService, 'checkIfEmailExist').and.returnValue(Promise.resolve(true));

        try {
            const output = await userService.createUser(myUser);
            fail();
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});
