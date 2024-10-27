# Node.js Benchmarking

This repository explores different approaches to data processing with Node.js and MongoDB. It focuses on comparing the performance of processing data at the database level versus the application level.

## Overview

When working with MongoDB, developers often face a choice between:
1. Processing data in the application after filtering it from the database.
2. Utilizing MongoDB's aggregation pipeline to handle transformations directly in the database.

Each approach has its pros and cons:

- Application-level processing is more flexible and easier to iterate on during development, but it can increase server CPU and memory load.
- Database-level processing can significantly improve performance, especially with large datasets, but complex

This project benchmarks both approaches to help guide better decision-making in terms of performance and scalability.

## Problem Statement

The project focuses on an API that retrieves data from a MongoDB collection containing 1.5 million documents. Each document includes details such as a person's name, email, country, and a randomly assigned indexField.

- The indexField ranges between 1 and 100,000, resulting in an average of 15 documents per indexField.
- The API is designed to return data within a given range of indexField values.
- The response includes country-wise data, along with:
- - Total Entries: The total number of documents for each country.
- - Unique Entries: The number of unique email addresses for each country.

The goal is to explore which approach (database vs. application) provides better performance when scaling with large datasets.


## Features

- **Side-by-side comparisons**: Demonstrates how each approach works through clear, simple examples.
- **Performance benchmarks**: Benchmarks both strategies on various dataset sizes, showcasing performance differences.
- **Detailed results**: Provides a breakdown of results with clear, easy-to-interpret data.

## Results

For detailed logs around the result, check out the logs in the [Screenshots README](./screenshots/README.md).

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/apanjwani0/MongoDB-Benchmarking.git
2. Install Dependencies:
    ```bash
    npm install
3. Configuration: 
    - Copy sample.env to .env:
    - Edit .env: Fill in your configuration settings.
4. Run the server
    ```bash
    npm run dev
5. Hit the API with custom parameters:

   - **For database-side processing:**
     ```bash
     curl --location 'http://localhost:3000/api/complexAggregation?min=1&max=1000'
     ```

   - **For application-side processing:**
     ```bash
     curl --location 'http://localhost:3000/api/application/complexAggregation?min=1&max=1000'
     ```

    #### Notes:
    - Adjust the `min` and `max` parameters to set the range of data being processed.

## Notes

- Hit API multiple times, as db will cache the request.
- Make sure of the limitations around DB query stage. 
- Use DB tools (like MongoDB Atlas) to fast-pace writing complex queries.
