import {getAllUsers, createUser} from './service.js';
async function getAllUsersController(req, res) { 
    try{
        const users=await getAllUsers();
        res.status(200).json(users);
        
    }catch(err){
        console.error('Error in getAllUsersController:', err);
        res.status(500).json({ error: 'Internal Server Error' });   
    }};


async function createUserController(req,res){
    try{
        const {name, email,password_hash}=req.body;
        const newUser=await createUser(name ,email,password_hash);
        res.status(201).json(newUser);

    } catch (err){
        console.error('Error Creating the User!!',err);
        res.status(500).json({error :'Internal Server Error'});

    }
}
export {getAllUsersController,createUserController};