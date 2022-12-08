const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models');

const UserData = {
  full_name: 'User',
  email: 'user@gmail.com',
  username: 'user',
  password: '123456789',
  profile_image_url: 'https://picsum.photos/id/1/200/200',
  age: 19,
  phone_number: 12345,
};

const UserUpdate = {
  full_name: 'User Update',
  email: 'user@gmail.com',
  username: 'user',
  password: '123456789',
  profile_image_url: 'https://picsum.photos/id/1/200/200',
  age: 19,
  phone_number: 12345,
};

const WrongUser = {
  full_name: '',
  email: 'user',
  username: '',
  password: '',
  profile_image_url: 'photos',
  age: '',
  phone_number: '',
};

const UserLogin = {
  email: 'user@gmail.com',
  password: '123456789',
};

const WrongUserLogin = {
  email: 'userWrong@gmail.com',
  password: '123456789',
};

let token;
let id;

// Register
describe('POST /users/register', () => {
  it('Should send response with 201 status code', (done) => {
    request(app)
      .post('/users/register')
      .send(UserData)
      .end((err, res) => {
        if (err) done(err);
        id = res.body.user.id;
        expect(res.status).toEqual(201);
        expect(typeof res.body).toEqual('object');
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user).toHaveProperty('full_name');
        expect(res.body.user).toHaveProperty('email');
        expect(res.body.user).toHaveProperty('username');
        expect(res.body.user).toHaveProperty('profile_image_url');
        expect(res.body.user).toHaveProperty('age');
        expect(res.body.user).toHaveProperty('phone_number');
        done();
      });
  });
});

describe('POST /users/register', () => {
  it('Should send response with 400 status code', (done) => {
    request(app)
      .post('/users/register')
      .send(WrongUser)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('full_name');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('password');
        expect(res.body).toHaveProperty('profile_image_url');
        expect(res.body).toHaveProperty('age');
        expect(res.body).toHaveProperty('phone_number');
        done();
      });
  });
});

// Login
describe('POST /users/login', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .post('/users/login')
      .send(UserLogin)
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('token');
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });
});

describe('POST /users/login', () => {
  it('Should send response with 400 status code', (done) => {
    request(app)
      .post('/users/login')
      .send(WrongUserLogin)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('message');
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });
});

// Update
describe('PUT /users/:userId', () => {
  it('Should send response with 400 status code', (done) => {
    request(app)
      .put('/users/' + id)
      .set('token', token)
      .send(WrongUser)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('full_name');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('password');
        expect(res.body).toHaveProperty('profile_image_url');
        expect(res.body).toHaveProperty('age');
        expect(res.body).toHaveProperty('phone_number');
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });
});

describe('PUT /users/:userId', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .put('/users/' + id)
      .set('token', token)
      .send(UserUpdate)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body.user).toHaveProperty('full_name');
        expect(res.body.user).toHaveProperty('email');
        expect(res.body.user).toHaveProperty('username');
        expect(res.body.user).toHaveProperty('profile_image_url');
        expect(res.body.user).toHaveProperty('age');
        expect(res.body.user).toHaveProperty('phone_number');
        done();
      });
  });
});

// Delete
describe('DELETE /users/:userId', () => {
  it('Should send response with 404 status code', (done) => {
    request(app)
      .delete('/users/' + (id + 99))
      .set('token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('message');
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });
});

describe('DELETE /users/:userId', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .put('/users/' + id)
      .set('token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body.message).not.toBeNull();
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });
});

afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete('Users', {})
    .then(() => {
      return done();
    })
    .catch((err) => {
      done(err);
    });
});
