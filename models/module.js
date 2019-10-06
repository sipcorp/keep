const mongoose = require('mongoose');
const { Schema } = mongoose;

const ModuleSchema = mongoose.Schema({
   parent: {type:String, require:true},
   name:{type:Array,require:true},
   hash:{type:String, unique: true, require:true}
},{collection:'module'})

module.exports = mongoose.model('module', ModuleSchema);


