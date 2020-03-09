const request = require('supertest');
const DinerRouter = require('./diners-router')
const server = require('../api/server')
const db = require('../database/dbConfig.js');
const Diners = require('../diners/diners-model.js');



describe.skip('diners get/put/delete', () => {

    it('should insert the provided users into the db', async () => {
            await Diners.add({ username: "mathew1", password: "Herman16&", email: "herm@gmail.com" });

            const diners = await db('diners');
            expect(diners).toHaveLength(1);
    })

    it("get diner", async () => {
            const res = await Diners.find();
            expect(res).toHaveLength(1);
    });

    it("get diner", async () => {
        const res = await Diners.find();
        expect(res[0].username).toBe('mathew1');
    });

    it('get diner id', async () => {
        const res = await request(server.use(DinerRouter)).get('/1');
        expect(res.status).toBe(200);
    });

    it("update diner", async () => {
        const res = await request(server.use(DinerRouter)).put("/1")
          .send({
            username: "david",
            password: "hermanNN69*",
            email: "david@gmail.com",
            currentLocation: "mexico"
          })
        expect(res.type).toBe("application/json")
      })

      it("delete diner", async () => {
        const res = await request(server.use(DinerRouter)).delete("/2")
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
      })

});

describe.skip('diners favTruck', () => {

    it('add fav truck', async () => {
      await Diners.addFavouriteTrucks({ truck_id: 1 , diner_id: 1});

      const trucks = await db('favourite_trucks');
      expect(trucks).toHaveLength(1);
    })

    it("get", async () => {
            const res = await Diners.findFavouriteTrucksById(1);
            expect(res).toHaveLength(1);
    });

    it("delete fav truck", async () => {
      const res = await request(server.use(DinerRouter)).delete("/1/favouriteTrucks")
      expect(res.status).toBe(200)
      expect(res.type).toBe("application/json")
    })

});

describe.skip('diners customerRatingMenu', () => {

  it('add cust rating', async () => {
    await Diners.addCustomerRatingMenu({ rating: 5 , menu_id: 1, diner_id: 1});

    const rating = await db('customer_rating_menu');
    expect(rating).toHaveLength(1);
  })

  it("get", async () => {
    const res = await Diners.findByCustomerRatingMenuItemId(1);
    expect(res).toBeTruthy()
  });

  it("update menu rating", async () => {
    const res = await request(server.use(DinerRouter)).put("/1/customerRatingMenu")
      .send({
        rating: 3,
        menu_id: 1,
        diner_id: 1
      })
    expect(res.type).toBe("application/json")
  })

  it("delete manu rating", async () => {
    const res = await request(server.use(DinerRouter)).delete("/1/customerRatingMenu")
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
  })

});

describe('diners customerRatingTruck', () => {

  it('add cust rating', async () => {
    await Diners.addCustomerRatingTruck({ rating: 5 , truck_id: 1, diner_id: 1});

    const rating = await db('customer_rating_truck');
    expect(rating).toHaveLength(1);
  })

  it("get", async () => {
    const res = await Diners.findByCustomerRatingId(1);
    expect(res).toBeTruthy()
  });

  it("update truck rating", async () => {
    const res = await request(server.use(DinerRouter)).put("/1/customerRatingTruck")
      .send({
        rating: 3,
        truck_id: 1,
        diner_id: 1
      })
    expect(res.type).toBe("application/json")
  })

  it("delete truck rating", async () => {
    const res = await request(server.use(DinerRouter)).delete("/1/customerRatingTruck")
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
  })

});



// beforeEach(async () => {
//     await db('customer_rating_truck').truncate();
// })