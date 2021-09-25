import { UserService } from './user';
import { userMock } from '../../test-files/index';
import { fail } from 'assert';

describe('User service', () => {
    let userService: UserService;
    beforeEach(() => {
        userService = new UserService();
    });

    it('Should return true when having a password equal to crypted password', async () => {
        // Arrange
        const password = 'toto';
        const hashpassword = '$2b$10$g2UPqjMLKnksOzPukpCvD.LLjfxLji0GXP4iSmQh1HjPDZpsVEK3.';

        // Act
        const output = await userService.comparePassword(password, hashpassword);

        // Assert
        expect(output).toEqual(true);
    });

    it('Should return true when having a password not equal to crypted password', async () => {
        const password = 'tot';
        const hashpassword = '$2b$10$g2UPqjMLKnksOzPukpCvD.LLjfxLji0GXP4iSmQh1HjPDZpsVEK3.';
        const output = await userService.comparePassword(password, hashpassword);
        expect(output).toEqual(false);
    });

    it('Should return user when having email and password matching to an existing user in the system', async () => {
        const email = 'dadie.emilin@gmail.com';
        const password = 'toto';
        const myUserMock = userMock;

        spyOn(userService, 'logUser').and.returnValue(Promise.resolve(myUserMock));

        const output: any = await userService.logUser(email, password);

        expect(output.id).toBeDefined();
    });

    it('Should return an error when having email and password unmatching to existing user in the system', async () => {
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'toto';
        spyOn(userService, 'getUserByEmail').and.returnValue(Promise.resolve(false));

        try {
            const output = await userService.logUser(inputEmail, inputPassword);
            fail();
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    it('Should return an error when having email and password unmatching to existing user in the system', async () => {
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'toto';
        spyOn(userService, 'getUserByEmail').and.returnValue(Promise.resolve(true));
        spyOn(userService, 'comparePassword').and.returnValue(Promise.resolve(false));

        try {
            const output = await userService.logUser(inputEmail, inputPassword);
            fail();
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});
