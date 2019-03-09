const EventEmitter = require("events");
var url="https://github.com/iasatan";

class Logger extends EventEmitter{
    log(message){
        console.log(new Date()+": "+message);
        this.emit("messageLoaded", {id:1, name:"satan adam"});
    }
}



module.exports=Logger;
