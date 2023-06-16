const request = require('supertest');
const  {sequelize} = require('../models')
const app = require('../app');

beforeAll(async ()=>{
    await sequelize.sync({ force: true });
});

describe('POST /jon', ()=>{
    test('로그인 안 했으면 가입', (done)=>{
        request(app).post('/auth/join')
            .send({
                email: 'plus4957@gmail.com',
                nick: 'plusmail',
                password:'aaaa',
            })
            .expect('Location', '/')
            .expect(302, done)
    })
})


describe('POST /login', ()=>{
    test('로그인 수행', (done)=>{
        request(app).post('/auth/login')
            .send({
                email: 'plus4957@gmail.com',
                password:'aaaa',
            })
            .expect('Location', '/')
            .expect(302, done);
    })
})


describe('POST /join', () =>{
    const agent = request.agent(app);
    beforeEach((done)=>{
        agent.post('/auth/login')
            .send({
                email: 'plus4957@gmail.com',
                password: 'aaaa'
            }).end(done);

    });

    test('이미 로그인했으면 redirect /', (done)=>{
        const message = encodeURIComponent('로그인한 상태입니다.');
        agent.post('/auth/join')
            .send({
                email:'plus4957@gmail.com',
                nick: 'zerocho',
                password:'aaaa',
            })
            .expect('Location', `/?error=${message}`)
            .expect(302, done);

    });

})

afterAll(async ()=>{
    await sequelize.sync({force: true})
})