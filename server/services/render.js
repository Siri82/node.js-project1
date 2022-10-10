const axios = require('axios');

exports.homeRoutes=(req,res)=>{
    axios.get(`http://localhost:${process.env.PORT}/api/users`)
    .then(function(response){
        res.render("index", {"users": response.data});   
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.add_user=(req,res)=>{
    res.render("add_user")
}

exports.update_user=(req,res)=>{
    axios.get(`http://localhost:${process.env.PORT}/api/users`,{params: {id: req.query.id}})
    .then(function(userdata){
        res.render("update_user",{"user": userdata.data })
    })
    .catch(err=>{
        res.send(err);
    })
    
}

exports.search=(req,res)=>{
    res.render("search");
}

exports.reports=(req,res)=>{
    res.render("reports");
}
