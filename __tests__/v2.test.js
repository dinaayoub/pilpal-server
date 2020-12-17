'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const mockRequest = supergoose(server);

/*
POST /api/v1/:model adds an item to the DB and returns an object with the added item
GET /api/v1/:model returns a list of :model items
GET /api/v1/:model/ID returns a single item by ID
PUT /api/v1/:model/ID returns a single, updated item by ID
DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found
 */

 //TODO: IMPLEMENT THIS!!

describe('API V2', () => {

    let id = 0;

    it('can add an item to the database', async () => {
        let object = { name: 'banana', calories: 100, type: 'fruit' };
        let expected = { name: 'banana', calories: 100, type: 'FRUIT' };
        const response = await mockRequest.post('/api/v1/food').send(object);
        id = response.body._id;
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(expected);
    });

    it('can update an item in the database', async () => {
        let object = { _id: id, name: 'coconut', calories: 33, type: 'fruit' };
        let expected = { name: 'coconut', calories: 33, type: 'FRUIT' };
        const response = await mockRequest.put(`/api/v1/food/${id}`).send(object);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expected);
    });

    it('can get a list of items from the database', async () => {
        const response = await mockRequest.get('/api/v1/food');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    it('can get one item from the database', async () => {
        const response = await mockRequest.get(`/api/v1/food/${id}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toStrictEqual(id);
    });

    it('can delete an item from the database', async () => {
        const response = await mockRequest.delete(`/api/v1/food/${id}`);
        expect(response.status).toBe(200);
        const response2 = await mockRequest.get(`/api/v1/food/${id}`);
        expect(response2.status).toBe(200);
        expect(response2.body).toBe(null);
    });
});