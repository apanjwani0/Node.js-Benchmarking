const Dataset = require("./dataset.model");

const addDataset = async (data) => {
  try {
    const newRecord = new Dataset(data);
    return await newRecord.save();
  } catch (error) {
    throw new Error("Error adding dataset: " + error.message);
  }
};

const queryDataset = async (filter) => {
  try {
    filter = (filter.min && filter.max) ? { indexField: { $gte: parseInt(filter.min), $lte: parseInt(filter.max) } } : { indexField: { $exists: true } };
    console.log(filter);
    return await Dataset.find(filter).lean();
  } catch (error) {
    throw new Error("Error querying dataset: " + error.message);
  }
};

const groupByCountry = async (filter) => {
  try {
    filter = (filter.min && filter.max) ? { indexField: { $gte: parseInt(filter.min), $lte: parseInt(filter.max) } } : { indexField: { $exists: true } };
    console.log(filter);
    return await Dataset.aggregate([
      {
        $match: filter,
      },
      {
        $group:
        {
          _id: "$country",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $count:
          "total",
      },
    ]);
  } catch (error) {
    throw new Error("Error querying dataset: " + error.message);
  }
};

const complexAggregation = async (filter) => {
  try {
    filter = (filter.min && filter.max) ? { indexField: { $gte: parseInt(filter.min), $lte: parseInt(filter.max) } } : { indexField: { $exists: true } };
    console.log(filter);
    return await Dataset.aggregate([
      {
        $match: filter,
      },
      {
        $set:{
          joined: { $month: "$createdAt" },
        },
      },
      {
        $sort: {
          createdAt: 1
        }
      },
      {
        $group:
        {
          _id: "$country",
          count: {
            $sum: 1,
          },
          details: { $push: { name: "$name", email: "$email", phoneNumber: "$phoneNumber", joinedMonth: "$joined" } },
          uniqueEmails: { $addToSet: "$email" },
        },
      },
      {
        $set: {
          uniqueEntries: { $size: "$uniqueEmails" }
        }
      },
      {
        $sort: {
          _id: 1
        }
      },
      {
        $facet: {
          result: [{ $limit: 10000 }],
          aggregatedData: [
            {
              $group: {
                _id: null,
                totalCountries: { $sum: 1 },
                totalUniqueUsers: { $sum: "$uniqueEntries"},
              }
            }
          ]
        }
      },
    ]);
  } catch (error) {
    console.log(error)
    throw new Error("Error querying dataset: " + error.message);
  }
};

module.exports = {
  addDataset, queryDataset,

  groupByCountry,

  complexAggregation

};
