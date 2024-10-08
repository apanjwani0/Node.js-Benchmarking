# MongoDB Benchmarking

This repository explores different approaches to data processing with MongoDB. It focuses on comparing the performance of processing data at the database level versus the application level.

## Overview

When working with MongoDB, developers often face a choice between:
1. Processing data in the application after fetching it from the database.
2. Utilizing MongoDB's aggregation pipeline to handle transformations directly in the database.

This project benchmarks both approaches to help guide better decision-making in terms of performance and scalability.

## Features
- **Simple examples** for each approach.
- **Performance benchmarks** for various dataset sizes.
- **Clear results** comparing the two strategies.

## Results

For detailed logs around the result, check out the [Screenshots README](./screenshots/README.md).

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/apanjwani0/MongoDB-Benchmarking.git
2. Install Dependencies:
    ```bash
    npm install
3. Run the server
    ```bash
    npm run dev
4. Hit the API with custom parameters:

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
