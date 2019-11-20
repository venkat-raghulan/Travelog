let dateHelper = function(dbData) {
  const data = {
    college: dbData.forEach(trip => trip.college)
  };
  //   console.log(dbData);
  // console.log(data.college);
  return data;
};

module.exports = dateHelper;
