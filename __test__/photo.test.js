const app = require('../app');
const request = require('supertest');
const { generateToken } = require('../helpers/jwt');
const { hashPassword } = require('../helpers/bcrypt.js');
const { sequelize } = require('../models');

const PhotoData = {
  title: 'Photo1',
  caption: 'Profile Picture',
  poster_image_url: 'https://picsum.photos/id/1/200/200',
};

const PhotoDataUpdate = {
  title: 'Photo1 Update',
  caption: 'Profile Picture Update',
  poster_image_url: 'https://picsum.photos/id/1/200/200',
};

const WrongPhoto = {
  title: '',
  caption: '',
  poster_image_url: '',
};

let token;
let id;

// Create Photo
describe('POST /photos', () => {
  it('Should send response with 201 status code', (done) => {
    request(app)
      .post('/photos')
      .set('token', token)
      .send(PhotoData)
      .end((err, res) => {
        if (err) done(err);
        id = res.body.id;
        expect(res.status).toEqual(201);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.id).toEqual('number');
        expect(typeof res.body.UserId).toEqual('number');
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('poster_image_url');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('caption');
        expect(res.body).toHaveProperty('UserId');
        expect(res.body.poster_image_url).toEqual(
          PhotoData.poster_image_url
        );
        expect(res.body.title).toEqual(PhotoData.title);
        expect(res.body.caption).toEqual(PhotoData.caption);
        done();
      });
  });
});

describe('POST /photos', () => {
  it('Should send response with 400 status code', (done) => {
    request(app)
      .post('/photos')
      .set('token', token)
      .send(WrongPhoto)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body.poster_image_url).not.toBeNull();
        expect(res.body.title).not.toBeNull();
        expect(res.body.caption).not.toBeNull();
        expect(res.body).toHaveProperty('poster_image_url');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('caption');
        done();
      });
  });
});

// Get Photo
describe('GET /photos', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .get('/photos')
      .set('token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.photos[0].id).toEqual('number');
        expect(typeof res.body.photos[0].UserId).toEqual('number');
        expect(res.body.photos[0]).toHaveProperty('id');
        expect(res.body.photos[0]).toHaveProperty('poster_image_url');
        expect(res.body.photos[0]).toHaveProperty('title');
        expect(res.body.photos[0]).toHaveProperty('caption');
        expect(res.body.photos[0]).toHaveProperty('UserId');
        done();
      });
  });
});

describe('GET /photos', () => {
  it('Should send response with 401 status code', (done) => {
    request(app)
      .get('/photos')
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.name).toEqual('string');
        expect(typeof res.body.message).toEqual('string');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('message');
        done();
      });
  });
});

// Update Photo
describe('PUT /photos/:photoId', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .put('/photos/' + id)
      .set('token', token)
      .send(PhotoDataUpdate)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.photo.id).toEqual('number');
        expect(typeof res.body.photo.UserId).toEqual('number');
        expect(res.body.photo).toHaveProperty('id');
        expect(res.body.photo).toHaveProperty('poster_image_url');
        expect(res.body.photo).toHaveProperty('title');
        expect(res.body.photo).toHaveProperty('caption');
        expect(res.body.photo).toHaveProperty('UserId');
        expect(res.body.photo).toHaveProperty('createdAt');
        expect(res.body.photo).toHaveProperty('updatedAt');
        expect(res.body.photo.poster_image_url).toEqual(
          PhotoDataUpdate.poster_image_url
        );
        expect(res.body.photo.title).toEqual(PhotoDataUpdate.title);
        expect(res.body.photo.caption).toEqual(
          PhotoDataUpdate.caption
        );
        done();
      });
  });
});

describe('PUT /photos/:photoId', () => {
  it('Should send response with 400 status code', (done) => {
    request(app)
      .put('/photos/' + id)
      .set('token', token)
      .send(WrongPhoto)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body.poster_image_url).not.toBeNull();
        expect(res.body.title).not.toBeNull();
        expect(res.body.caption).not.toBeNull();
        expect(res.body).toHaveProperty('poster_image_url');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('caption');
        done();
      });
  });
});

// Delete Photo
describe('PUT /photos/:photoId', () => {
  it('Should send response with 404 status code', (done) => {
    request(app)
      .delete('/photos/' + (id + 99))
      .set('token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.name).toEqual('string');
        expect(typeof res.body.message).toEqual('string');
        expect(res.body.name).not.toBeNull();
        expect(res.body.message).not.toBeNull();
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('message');
        done();
      });
  });
});

describe('DELETE /photos/:photoId', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .delete('/photos/' + id)
      .set('token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.message).toEqual('string');
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).not.toBeNull();
        done();
      });
  });
});

beforeAll((done) => {
  sequelize.queryInterface
    .bulkInsert(
      'Users',
      [
        {
          email: 'user@gmail.com',
          full_name: 'User Test',
          username: 'usertest',
          password: hashPassword('123456'),
          profile_image_url: 'https://photo.com',
          age: 20,
          phone_number: 12345,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    )
    .then((result) => {
      token = generateToken({
        id: result[0].id,
        email: result[0].email,
      });
      return done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete('Photos', {})
    .then(() => {
      return done();
    })
    .catch((err) => {
      done(err);
    });

  sequelize.queryInterface
    .bulkDelete('Users', {})
    .then(() => {
      return done();
    })
    .catch((err) => {
      done(err);
    });
});
