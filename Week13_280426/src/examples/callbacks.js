function fetchData(callback) {
  setTimeout(() => {
    callback(null, { id: 1, title: 'Callback example' });
  }, 500);
}

function transformData(data, callback) {
  setTimeout(() => {
    callback(null, { ...data, transformed: true });
  }, 400);
}

console.log('Starting callback example');

fetchData((error, data) => {
  if (error) {
    return console.error('Error fetching data:', error);
  }

  transformData(data, (error, transformed) => {
    if (error) {
      return console.error('Error transforming data:', error);
    }

    console.log('Final callback result:', transformed);
  });
});
