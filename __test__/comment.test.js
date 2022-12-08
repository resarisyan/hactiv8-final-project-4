const app = require('../app');
const request = require('supertest');
const { generateToken } = require('../helpers/jwt');
const { hashPassword } = require('../helpers/bcrypt.js');
const { sequelize } = require('../models');

let CommentData = {
  comment: 'Ini Komentar',
  PhotoId: '',
};

let CommentDataUpdate = {
  comment: 'Ini Komentar Update',
  PhotoId: '',
};

const WrongComment = {
  comment: '',
  PhotoId: '',
};

let token;
let userId;
let photoId;
let id;

// Create Comment
describe('POST /comments', () => {
  it('Should send response with 201 status code', (done) => {
    request(app)
      .post('/comments')
      .set('token', token)
      .send(CommentData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(201);
        id = res.body.comment.id;
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.comment.id).toEqual('number');
        expect(typeof res.body.comment.UserId).toEqual('number');
        expect(typeof res.body.comment.comment).toEqual('string');
        expect(res.body.comment).toHaveProperty('id');
        expect(res.body.comment).toHaveProperty('UserId');
        expect(res.body.comment).toHaveProperty('comment');
        expect(res.body.comment).toHaveProperty('updatedAt');
        expect(res.body.comment).toHaveProperty('createdAt');
        expect(res.body.comment.comment).toEqual(CommentData.comment);
        done();
      });
  });
});

describe('POST /comments', () => {
  it('Should send response with 400 status code', (done) => {
    request(app)
      .post('/comments')
      .set('token', token)
      .send(WrongComment)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body.comment).not.toBeNull();
        expect(res.body).toHaveProperty('comment');
        done();
      });
  });
});

// Get Comment
describe('GET /comments', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .get('/comments')
      .set('token', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body[0].Photo).toEqual('object');
        expect(typeof res.body[0].User).toEqual('object');
        expect(typeof res.body[0].id).toEqual('number');
        expect(typeof res.body[0].UserId).toEqual('number');
        expect(typeof res.body[0].PhotoId).toEqual('number');
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('UserId');
        expect(res.body[0]).toHaveProperty('PhotoId');
        expect(res.body[0]).toHaveProperty('comment');
        expect(res.body[0]).toHaveProperty('createdAt');
        expect(res.body[0]).toHaveProperty('updatedAt');
        done();
      });
  });
});

describe('GET /comments', () => {
  it('Should send response with 401 status code', (done) => {
    request(app)
      .get('/comments')
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

// Update Comment
describe('PUT /comments/:commentId', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .put('/comments/' + id)
      .set('token', token)
      .send(CommentDataUpdate)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(typeof res.body.comment.id).toEqual('number');
        expect(typeof res.body.comment.PhotoId).toEqual('number');
        expect(typeof res.body.comment.UserId).toEqual('number');
        expect(res.body.comment).toHaveProperty('id');
        expect(res.body.comment).toHaveProperty('PhotoId');
        expect(res.body.comment).toHaveProperty('UserId');
        expect(res.body.comment).toHaveProperty('comment');
        expect(res.body.comment).toHaveProperty('updatedAt');
        expect(res.body.comment.comment).toEqual(
          CommentDataUpdate.comment
        );
        done();
      });
  });
});

describe('PUT /comments/:commentId', () => {
  it('Should send response with 400 status code', (done) => {
    request(app)
      .put('/comments/' + id)
      .set('token', token)
      .send(WrongComment)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body.comment).not.toBeNull();
        expect(res.body).toHaveProperty('comment');
        done();
      });
  });
});

// Delete Comment
describe('DELETE /comments/:commentId', () => {
  it('Should send response with 404 status code', (done) => {
    request(app)
      .delete('/comments/' + (id + 99))
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

describe('DELETE /comments/:commentId', () => {
  it('Should send response with 200 status code', (done) => {
    request(app)
      .delete('/comments/' + id)
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
      userId = result[0].id;
      token = generateToken({
        id: result[0].id,
        email: result[0].email,
      });
      sequelize.queryInterface
        .bulkInsert(
          'Photos',
          [
            {
              title: 'Photo1',
              caption: 'Profile Picture',
              poster_image_url: 'https://picsum.photos/id/1/200/200',
              UserId: userId,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { returning: true }
        )
        .then((result) => {
          photoId = result[0].id;
          console.log('Photo Saya: ' + photoId);
          CommentData.PhotoId = photoId;
          CommentDataUpdate.PhotoId = photoId;
          return done();
        })
        .catch((err) => {
          done(err);
        });
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete('Comments', {})
    .then(() => {
      return done();
    })
    .catch((err) => {
      done(err);
    });

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
