const aggregateData = (docs) => {
  // Step 1: Group by country and count occurrences
  const groupedData = docs.reduce((acc, doc) => {
    // If the country already exists in the accumulator, increase the count
    if (acc[doc.country]) {
      acc[doc.country].count += 1;
    } else {
      // Otherwise, initialize the group with count 1
      acc[doc.country] = { _id: doc.country, count: 1 };
    }
    return acc;
  }, {});

  // Step 2: Convert the grouped data into an array of objects
  const groupedArray = Object.values(groupedData);

  // Step 3: Calculate the total number of unique groups (countries)
  const total = groupedArray.length;

  return { groupedArray, total };
};

const aggregateDataComplex = (docs) => {
  // Step 1: Add the "joined" field based on the month of "createdAt"

  docs = docs.map(doc => ({
    ...doc,
    joined: new Date(doc.createdAt).getMonth() + 1 // JavaScript months are 0-indexed, so we add 1
  }));


  // Step 2: Sort by "createdAt" field in ascending order
  docs = docs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Step 3: Group by "country", count the number of documents, and collect "details"
  const groupedData = docs.reduce((acc, doc) => {
    const key = doc.country;
    if (!acc[key]) {
      acc[key] = {
        _id: key,
        count: 0,
        details: []
      };
    }
    acc[key].count += 1;
    acc[key].details.push({
      name: doc.name,
      email: doc.email,
      phoneNumber: doc.phoneNumber,
      joinedMonth: doc.joined
    });
    return acc;
  }, {});


  // Step 4: Convert groupedData object into an array and add "uniqueEntries" (unique details count)
  const groupedArray = Object.values(groupedData).map(group => {
    // Create a Set of unique users by 'email' (or you can use phoneNumber, etc.)
    const uniqueUsersSet = new Set(group.details.map(detail => detail.email));
    return {
      ...group,
      uniqueEntries: uniqueUsersSet.size // Number of unique users
    };
  });

  
  // Step 5: Sort by country in ascending order
  groupedArray.sort((a, b) => a._id.localeCompare(b._id));

  // Step 6: Process the $facet stage to return two parts: "result" and "aggregatedData"
  const result = groupedArray.slice(0, 10000); // Limit to 10000 results for "result" facet
  const aggregatedData = groupedArray.reduce(
    (acc, group) => {
      acc.totalCountries += 1;
      acc.totalUniqueUsers += group.uniqueEntries;
      return acc;
    },
    { totalCountries: 0, totalUniqueUsers: 0 }
  );

  return {
    result,
    aggregatedData: [aggregatedData]
  };
};

module.exports = {
  aggregateData,
  aggregateDataComplex
}