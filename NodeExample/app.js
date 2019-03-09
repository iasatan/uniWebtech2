const log = require('./logger');
const os = require('os');
var totalmemory = os.totalmem();
var freememory = os.freemem();
var cpu = os.cpus();
console.log(totalmemory+", "+freememory);

