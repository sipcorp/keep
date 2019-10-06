const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = mongoose.Schema({
   name:{type:String,require:true, unique:true},
   module:{type:Array,require:true , unique:true}
},{collection:'role'})

module.exports = mongoose.model('role', RoleSchema);