'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Photos', [
      {
        title: 'Photo1',
        caption: 'Profile Picture',
        poster_image_url: 'https://picsum.photos/id/1/200/200',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Photo1',
        caption: 'Profile Picture',
        poster_image_url: 'https://picsum.photos/id/2/200/200',
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Photos', null, {});
  }
};
