const mongoose = require("mongoose");
const Vehicle = require("../models/vehicle");
const Checkpoint = require("../models/checkpoint");

module.exports = () => {
  let cp1 = new Checkpoint({
    name: "CP-1",
    location: { lat: 11.800123, lon: 76.110234 },
    authSecret: "734e6f110cc5e19d6fead31403bbd2bd",
    roads: {},
  });

  cp1.roads.set("CP-2", { dist: 1, wct: 15 });
  cp1.roads.set("CP-3", { dist: 2, wct: 30 });

  let cp2 = new Checkpoint({
    name: "CP-2",
    location: { lat: 11.810123, lon: 76.130234 },
    authSecret: "14e65675cc5e19d6fead31403bbd2bd",
    roads: {},
  });

  cp2.roads.set("CP-1", { dist: 1, wct: 15 });
  cp2.roads.set("CP-4", { dist: 2, wct: 30 });

  cp1.save();
  cp2.save();
};
