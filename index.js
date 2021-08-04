const express=require('express');
const path=require('path');
const app=express();
const bodyParser=require('body-parser');
const patient_model = require("./patient_module");
const Patient = patient_model.Patient;
const nanoid=require("nanoid");
const mongo = require('mongodb');
app.use(express.json());
var urlencodedParser=bodyParser.urlencoded({extended:false});

app.set('view engine','ejs');

app.post("/track/data",urlencodedParser, async (req, res) => {
	console.log(req.body.id);
	var o_id = new mongo.ObjectId(req.body.id);
	let data = await Patient.find({"_id":o_id});
	res.render(data);
});

app.post("/patient",urlencodedParser, async (req, res) => {
	console.log(req.body)
	let p = await Patient(req.body);
	console.log(p);
	let result = p.save();
	res.render('patient',{id:p.id});
	
});
app.use(express.static(path.join(__dirname,"public"),{extensions:["html"]}));

PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Running on port ${PORT}`));