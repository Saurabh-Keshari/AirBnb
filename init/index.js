require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(Mongo_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  for (let i = 0; i < initData.data.length; i++) {
    let listing = initData.data[i];

    let response = await geocodingClient
      .forwardGeocode({
        query: `${listing.location}, ${listing.country}`,
        limit: 1,
      })
      .send();

    listing.geometry = response.body.features[0].geometry;
    listing.owner = "6a9719ff8197b330efba9307";
  }

  await Listing.insertMany(initData.data);
  console.log("Data was initialized with map coordinates!");
};

initDB();
