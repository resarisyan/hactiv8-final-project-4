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

    //Comments Ref User
    await queryInterface.addColumn('Comments', 'UserId', {
      type: Sequelize.INTEGER,
      after: 'id',
    });
    await queryInterface.addConstraint('Comments', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_Comments_UserId_ref_User_id',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    //Comments Ref Photo
    await queryInterface.addColumn('Comments', 'PhotoId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      after: 'UserId',
    });
    await queryInterface.addConstraint('Comments', {
      fields: ['PhotoId'],
      type: 'foreign key',
      name: 'fk_Comments_PhotoId_ref_Photo_id',
      references: {
        table: 'Photos',
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
      'Comments',
      'fk_Comments_UserId_ref_User_id'
    );
    await queryInterface.removeColumn('Comments', 'UserId');
    await queryInterface.removeConstraint(
      'Comments',
      'fk_Comments_PhotoId_ref_Photo_id'
    );
    await queryInterface.removeColumn('Comments', 'PhotoId');
  },
};
