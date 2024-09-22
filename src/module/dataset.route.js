const express = require("express");
const datasetController = require("./dataset.controller");
const router = express.Router();
const benchmarkWrapper = require('../utils/benchmarker');

router.post("/insertData", benchmarkWrapper(datasetController.insertData));
router.post("/updateData", benchmarkWrapper(datasetController.updateData));

router.get("/getCountryWisePopulation", benchmarkWrapper(datasetController.getCountryWisePopulation));
router.get("/application/getCountryWisePopulation", benchmarkWrapper(datasetController.getCountryWisePopulation_application));

router.get("/complexAggregation", benchmarkWrapper(datasetController.complexAggregation));
router.get("/application/complexAggregation", benchmarkWrapper(datasetController.complexAggregation_application));

module.exports = router;
