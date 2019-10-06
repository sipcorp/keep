const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClienteSchema = mongoose.Schema({
   empresa: {type:String, require:true},
   nombre: {type:String,require:true},
   email:{type:String,require:true},
   telefono:{type:String,require:false},
   movile:{type:String,require:false},
   direccion:{type:String,require:true},
   pais:{type:String,require:false},
   provincia:{type:String,require:false},
   distrito:{type:String,require:false},
   corregimiento:{type:String,require:false},
   departamento:{type:String,require:false},
   cargo:{type:String,require:false},
   direccionEmpresa:{type:String,require:false},
   RUC:{type:String,require:false},
   DV:{type:String,require:false},
},{collection:'contact'})

module.exports = mongoose.model('contact', ClienteSchema);