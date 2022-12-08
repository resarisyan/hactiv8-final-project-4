const app = require('../app');
const request = require('supertest');
const { generateToken } = require('../helpers/jwt');
const { hashPassword } = require('../helpers/bcrypt.js');
const { sequelize } = require('../models');

let SocialMediaData = {
  name: 'UserMedia',
  social_media_url: 'https://instagram.com/usermedia',
  UserId: '',
};

let SocialMediaDataUpdate = {
  name: 'UserMediaUpdate',
  social_media_url: 'https://instagram.com/usermediaupdate',
  UserId: '',
};

const WrongSocialMedia = {
  name: '',
  social_media_url: '',
  UserId: '',
};

let token;
let id;

// Create SocialMedia
describe('POST /socialmedias', () => {
  it('Should send response with 201 status code', (done) => {
    request(app)
      .post('/socialmedias')
      .set('token', token)
      .send(SocialMediaData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(201);
        id = res.body.social_media.id;
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.social_media.id).toEqual('number');
        expect(typeof res.body.social_media.UserId).toEqual('number');
        expect(typeof res.body.social_media.name).toEqual('string');
        expect(typeof res.body.social_media.social_media_url).toEqual(
          'string'
        );
        expect(res.body.social_media).toHaveProperty('id');
        expect(res.body.social_media).toHaveProperty('UserId');
        expect(res.body.social_media).toHaveProperty('name');
        expect(res.body.social_media).toHaveProperty(
          'social_media_url'
        );
        expect(res.body.social_media).toHaveProperty('updatedAt');
        expect(res.body.social_media).toHaveProperty('createdAt');
        expect(res.body.social_media.name).toEqual(
          SocialMediaData.name
        );
        expect(res.body.social_media.social_media_url).toEqual(
          SocialMediaData.social_media_url
        );
        done();
      });
  });
});

describe('POST /socialmedias', () => {
  it('Should send response with 400 status code', (done) => {
    request(app)
      .post('/socialmedias')
      .set('token', token)
      .send(WrongSocialMedia)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body.name).not.toBeNull();
        expect(res.body.social_media_url).not.toBeNull();
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('social_media_url');
        done();
      });
  });
});

// Get SocialMedia
describe('GET /socialmedias', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .get('/socialmedias')
      .set('token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.social_medias[0].User).toEqual(
          'object'
        );
        expect(typeof res.body.social_medias[0].id).toEqual('number');
        expect(typeof res.body.social_medias[0].UserId).toEqual(
          'number'
        );
        expect(res.body.social_medias[0]).toHaveProperty('id');
        expect(res.body.social_medias[0]).toHaveProperty('UserId');
        expect(res.body.social_medias[0]).toHaveProperty('name');
        expect(res.body.social_medias[0]).toHaveProperty(
          'social_media_url'
        );
        expect(res.body.social_medias[0]).toHaveProperty('User');
        expect(res.body.social_medias[0]).toHaveProperty('createdAt');
        expect(res.body.social_medias[0]).toHaveProperty('updatedAt');
        done();
      });
  });
});

describe('GET /socialmedias', () => {
  it('Should send response with 401 status code', (done) => {
    request(app)
      .get('/socialmedias')
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

// Update SocialMedia
describe('PUT /socialmedias/:socialmediaId', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .put('/socialmedias/' + id)
      .set('token', token)
      .send(SocialMediaDataUpdate)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.social_media.id).toEqual('number');
        expect(typeof res.body.social_media.UserId).toEqual('number');
        expect(res.body.social_media).toHaveProperty('id');
        expect(res.body.social_media).toHaveProperty('UserId');
        expect(res.body.social_media).toHaveProperty('name');
        expect(res.body.social_media).toHaveProperty(
          'social_media_url'
        );
        expect(res.body.social_media).toHaveProperty('createdAt');
        expect(res.body.social_media).toHaveProperty('updatedAt');
        expect(res.body.social_media.name).toEqual(
          SocialMediaDataUpdate.name
        );
        expect(res.body.social_media.social_media_url).toEqual(
          SocialMediaDataUpdate.social_media_url
        );
        done();
      });
  });
});

describe('PUT /socialmedias/:socialmediaId', () => {
  it('Should send response with 400 status code', (done) => {
    request(app)
      .put('/socialmedias/' + id)
      .set('token', token)
      .send(WrongSocialMedia)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body.name).not.toBeNull();
        expect(res.body.social_media_url).not.toBeNull();
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('social_media_url');
        done();
      });
  });
});

// Delete SocialMedia
describe('DELETE /socialmedias/:socialmediaId', () => {
  it('Should send response with 404 status code', (done) => {
    request(app)
      .delete('/socialmedias/' + (id + 99))
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

describe('DELETE /socialmedias/:socialmediaId', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .delete('/socialmedias/' + id)
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
      SocialMediaData.UserId = result[0].id;
      SocialMediaDataUpdate.UserId = result[0].id;
      return done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete('SocialMedias', {})
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
