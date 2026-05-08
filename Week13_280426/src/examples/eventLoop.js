console.log('script start');

setTimeout(() => {
  console.log('timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('promise callback');
});

process.nextTick(() => {
  console.log('nextTick callback');
});

console.log('script end');
