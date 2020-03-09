const db = require('../database/dbConfig.js');
const Operators = require('../operators/operators-model');

describe.skip('operators model', () => {
    it('should insert the provided users into the db', async () => {
            await Operators.add({ username: "matheew", password: "Herman16&", email: "herm@gmail.com" });
            // await Diners.add({ username: "hermanaasas" });

            const operators = await db('operators');
            expect(operators).toHaveLength(1);
        })

    it('should return the inserted operator', async () => {
        let operator = await Operators.add({ username: 'gary', password: "Herman16&", email: "herm@gmail.com" });
        expect(operator.username).toBe('gary');
    })
    
})

beforeEach(async () => {
    await db('operators').truncate();
})