const Seguelize = require('sequelize');
const User = require('./user');
const config = require('../config/config')['test'];
const sequelize = new Seguelize(
    config.database, config.username, config.password, config,
);

describe('User모델', () =>{
    test('static init메서드 호출', ()=>{
        expect(User.initiate(sequelize)).toBe(undefined);
    });

    test('static associate 메서드 호출', ()=>{
        const db = {
            User: {
                hasMany: jest.fn(),
                belongsToMany: jest.fn(),
            },
            Post: {},
        }
        User.associate(db);
        expect(db.User.hasMany).toHaveBeenCalledWith(db.Post);
        expect(db.User.belongsToMany).toHaveBeenCalledTimes(2)
        // expect(db.User.belongsToMany).toHaveBeenCalledWith(db.User);
    })
})