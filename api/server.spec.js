const server = require('./server.js')
const request = require('supertest')

describe.skip('server.js', () => {
    it('should set testing enviornment', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('GET /', () => {
        it('should return 200 OK.', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
    })

    it('should be json', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('text/html');
    })

    // it('should return the right object', async () => {
    //     const res = await request(server).get('/');
    //     expect(res.body).toEqual({ api: 'up' });
    // })
})