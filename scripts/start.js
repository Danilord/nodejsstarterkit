const { HTTP } = require('..');
const config = require('../config');


(async () => {

  let http = new HTTP({ config });
  await http.listen();

  console.log(`Server running in ${config.httpHost}:${config.httpPort}`);

})()
  .catch((err) => {
    console.error('ERROR STARTING SERVICE:', err);
  });
