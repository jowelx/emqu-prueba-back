const mysql = require('mysql')
const connect =  mysql.createConnection({
   
    host:"bhcxf5aj3bpfatz2ye3w-mysql.services.clever-cloud.com",
    user:"u6dmm4qgzrkh0mk4",
    password:"uRP1gOdt9OAlh66ypwYE",
    database:"bhcxf5aj3bpfatz2ye3w"
})
connect.connect(function(err){
    if(err){
        console.log(err);
       return
    }else{
        console.log('Db connect')
    }
})

module.exports = connect;