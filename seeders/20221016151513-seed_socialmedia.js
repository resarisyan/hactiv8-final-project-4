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
    await queryInterface.bulkInsert('SocialMedias', [
      {
        name: 'Andry',
        social_media_url: 'https://instagram.com/ndry0611_',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Resa Auliana Risyan',
        social_media_url: 'https://instagram.com/resarisyan',
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
     await queryInterface.bulkDelete('SocialMedias', null, {});
  }
};
