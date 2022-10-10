const Userdb = require('../model/model')

//create and save new user
exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can not be empty."})
        return;
    }

    const user = new Userdb({
        username:req.body.username,
        epwd:req.body.epwd,
        usergroup:req.body.usergroup,
        aut:req.body.aut,
        appenv:req.body.appenv,
        info:req.body.info
    })

    // save the user into db
    user.save(user)
    .then(data=>{
        // res.send(data)
        res.redirect('/add-user');
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "some error occured while as part of user creation."
        });
    });
}


//retrive and return all user(s)
exports.find=(req,res)=>{
    console.log(`Requesting the information for id:${req.query.id}`)
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : `Not found user with id ${id}`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: `Error retrieving user with id ${id}`})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

//update an user
exports.update=(req,res)=>{

    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{new: true, useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
 
}

// delete an user
exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message: "Unable to delete the user."
            });
        }else{
            res.send("user deleted sucessfully.")
        }
    })
    .catch(err=>{
        res.status(500).send({
        message: err.message || "an error occured while deleteing the user"
        })
    });
}
