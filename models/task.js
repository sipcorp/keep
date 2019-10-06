const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = mongoose.Schema({
   name: {type:String, require:true},
   contact:{type:String, require:true},
   saleEstimate:{type:Number, require:true},
   closingDate:{type:Date, require:true},
   email:{type:String, require:true},
   movile:{type:String, require:true},
   phone:{type:String, require:true},
   address:{type:String, require:true},
   position:{type:Number, require:true}
},{collection:'task'})

module.exports = mongoose.model('task', TaskSchema);