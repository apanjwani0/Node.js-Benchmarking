const { aggregateData, aggregateDataComplex } = require("./dataset.function");
const datasetService = require('./dataset.service');
const datasetGenerator = require('./dataset.generate');


const insertData = async (req, res) => {
  const { count = 1000, distinctIndexFields = 10 } = req.body;

  var batches = 100;
  var batchSize = count / batches;
  var totalItems = 0
  try {
    while (batches > 0) {

      const timestamp = Date.now();
      const data = datasetGenerator.generateData({ count: batchSize, distinctIndexFields });

      console.log('insertMany: start', batches, batchSize, Date.now() - timestamp);

      await Dataset.insertMany(data);

      
      console.log('insertMany: end', batches, batchSize, Date.now() - timestamp);
      console.log(`Inserted ${batchSize} records.\n\n`);

      batches--;
      totalItems += data.length;
    }
    return res.status(201).json({ totalItems });

  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  var update = { name: 'allocateRandomNumber', options: { min: 1, max: 100 } };
  update = req.body || update;
  try {
    const completeData = await datasetService.queryDataset();
    var flag = false;
    completeData.forEach(async (doc) => {
      if (update?.name.includes("allocateRandomNumber")) {
        const indexField = faker.datatype.number(update?.options);
        doc.indexField = indexField;
        flag = true;
      }
      if (flag) {
        await doc.save();
      }
    })
    res.status(200).json(result);

  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: error.message });

  }
};

const getCountryWisePopulation = async (req, res) => {
  try {
    const filter = req.query;

    const currentTimestamp = Date.now();

    const result = await datasetService.groupByCountry(filter);

    console.log(result);
    const currentTimestamp2 = Date.now();
    console.table([
      { state: 'Starting Query', currentTimestamp },
      { state: 'Ending Query', currentTimestamp: currentTimestamp2 },
      { difference: currentTimestamp2 - currentTimestamp, unit: 'ms' }
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCountryWisePopulation_application = async (req, res) => {
  try {
    const filter = req.query;

    const currentTimestamp = Date.now();
    var result = await datasetService.queryDataset(filter);

    console.log(`Fetched ${result.length || 0} documents`);

    const currentTimestamp2 = Date.now();
    result = aggregateData(result);
    const currentTimestamp3 = Date.now();

    console.table([
      { state: 'Starting Query', currentTimestamp },
      { state: 'Fetched filtered Data from DB', currentTimestamp: currentTimestamp2 },
      { difference: currentTimestamp2 - currentTimestamp, unit: 'ms' },
      { state: 'Aggregation completed', currentTimestamp: currentTimestamp3 },
      { difference: currentTimestamp3 - currentTimestamp2, unit: 'ms' },
    ]);


    console.log([{ total: result.total }]);

    res.status(200).json([{ total: result.total }]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const complexAggregation = async (req, res) => {
  try {
    const filter = req.query;

    const currentTimestamp = Date.now();

    const result = await datasetService.complexAggregation(filter);

    const currentTimestamp2 = Date.now();
    console.table([
      { state: 'Starting Query', currentTimestamp },
      { state: 'Ending Query', currentTimestamp: currentTimestamp2 },
      { difference: currentTimestamp2 - currentTimestamp, unit: 'ms' }
    ]);

    console.log(result[0].aggregatedData)

    res.status(200).json({
      success: true,
      data: result[0]
    });

  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

const complexAggregation_application = async (req, res) => {
  try {
    const filter = req.query;

    const currentTimestamp = Date.now();
    var result = await datasetService.queryDataset(filter);

    console.log(`Fetched ${result.length || 0} documents`);

    const currentTimestamp2 = Date.now();
    result = aggregateDataComplex(result);
    const currentTimestamp3 = Date.now();

    console.table([
      { state: 'Starting Query', currentTimestamp },
      { state: 'Fetched filtered Data from DB', currentTimestamp: currentTimestamp2 },
      { difference: currentTimestamp2 - currentTimestamp, unit: 'ms' },
      { state: 'Aggregation completed', currentTimestamp: currentTimestamp3 },
      { difference: currentTimestamp3 - currentTimestamp2, unit: 'ms' },
    ]);

    console.log(result.aggregatedData)

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  insertData, updateData,

  getCountryWisePopulation, getCountryWisePopulation_application,

  complexAggregation, complexAggregation_application

};
