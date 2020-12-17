'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const mockRequest = supergoose(server);
process.env.SECRET = 'bananas';

let users = {
    admin: { username: 'admin', password: 'password', role: 'admin' }, //YWRtaW46cGFzc3dvcmQ=
    editor: { username: 'editor', password: 'password', role: 'editor' }, //ZWRpdG9yOnBhc3N3b3Jk
    writer: { username: 'writer', password: 'password', role: 'writer' }, //d3JpdGVyOnBhc3N3b3Jk
    user: { username: 'user', password: 'password', role: 'user' }, //dXNlcjpwYXNzd29yZA==
};

describe('Authentication Routes', () => {

    Object.keys(users).forEach(userType => {

        describe(`${userType} users`, () => {

            it('can sign up a new user and return the token to the client', async () => {
                const response = await mockRequest.post('/signup').send(users[userType]);
                const userObject = response.body;
                expect(response.status).toBe(201);
                expect(userObject.token).toBeDefined();
                expect(userObject.user._id).toBeDefined();
                expect(userObject.user.username).toEqual(users[userType].username);
            });


            it('can signin with basic', async () => {

                const response = await mockRequest.post('/signin')
                    .auth(users[userType].username, users[userType].password);
                const userObject = response.body;
                expect(response.status).toBe(200);
                expect(userObject.token).toBeDefined();
                expect(userObject.user._id).toBeDefined();
                expect(userObject.user.username).toEqual(users[userType].username)

            });

        });
    });
});