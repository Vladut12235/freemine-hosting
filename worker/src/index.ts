import 'dotenv/config';

console.log('FreeMine worker started.');

setInterval(() => {
  console.log('Checking queue and node health...');
}, 15000);
