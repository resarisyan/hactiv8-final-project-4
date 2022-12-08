'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Photos', 'UserId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      after: 'id',
    });
    await queryInterface.addConstraint('Photos', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_Photos_UserId_ref_User_id',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      'Photos',
      'fk_Photos_UserId_ref_User_id'
    );
    await queryInterface.removeColumn('Photos', 'UserId');
  },
};
