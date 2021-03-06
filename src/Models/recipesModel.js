const { ObjectID } = require('bson');
const connect = require('./connection');

const create = async (payload) => {
  const recipeId = await connect.getConnection().then((db) =>
    db.collection('recipes').insertOne({ ...payload }))
    .then((result) => result.insertedId);
  return recipeId;
};

const get = async (param) => {
  const recipesCollection = await connect.getConnection()
    .then((db) => db.collection('recipes'));

  if (param === 'all') return recipesCollection.find().toArray();
  if (!ObjectID.isValid(param)) return false;
  return recipesCollection.findOne({ _id: ObjectID(param) });
};

const update = async (payload, recipeId) => {
  const recipesCollection = await connect.getConnection()
    .then((db) => db.collection('recipes'));

  return recipesCollection.findOneAndUpdate(
    { _id: ObjectID(recipeId) },
    { $set: { ...payload } },
    { returnOriginal: false, upsert: true },
  );
};

const remove = async (recipeId) => {
  const recipesCollection = await connect.getConnection()
    .then((db) => db.collection('recipes'));

  return recipesCollection.findOneAndDelete({ _id: ObjectID(recipeId) });
};

module.exports = {
  create,
  get,
  update,
  remove,
};
