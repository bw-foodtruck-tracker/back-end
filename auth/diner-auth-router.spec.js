const db = require('../database/dbConfig.js');
const Diners = require('../diners/diners-model.js');

describe.skip('diners model', () => {
    it('should insert the provided users into the db', async () => {
            await Diners.add({ username: "matheew", password: "Herman16&", email: "herm@gmail.com" });
            // await Diners.add({ username: "hermanaasas" });

            const users = await db('diners');
            expect(users).toHaveLength(1);
        })

    it('should return the inserted user', async () => {
        let diner = await Diners.add({ username: 'gary', password: "Herman16&", email: "herm@gmail.com" });
        expect(diner.username).toBe('gary');
    })
    
})

beforeEach(async () => {
    await db('diners').truncate();
})