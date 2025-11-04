import express from'express';
import {Router} from 'express';
import { config } from './config/env.js';

const app= express();
const router= Router();
app.use(express.json())
app.use(router);
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 28,
    role: "admin",
    active: true
  },
  {
    id: 2,
    name: "Ben Carter",
    email: "ben.carter@example.com",
    age: 35,
    role: "editor",
    active: true
  },
  {
    id: 3,
    name: "Clara Kim",
    email: "clara.kim@example.com",
    age: 24,
    role: "viewer",
    active: false
  },
  {
    id: 4,
    name: "David Lopez",
    email: "david.lopez@example.com",
    age: 42,
    role: "editor",
    active: true
  },
  {
    id: 5,
    name: "Ella Brown",
    email: "ella.brown@example.com",
    age: 30,
    role: "viewer",
    active: false
  }
];
// const abc= producy

router.get('/',(request, response)=>{
    response.send('hi');
});
router.get('/users',(request, response)=>{
    return response.send(users);
});
router.get('/users', (request, response)=>{

    const {id}= request.query;
    if(id){
        const person = users.find((user)=> user.id === parseInt(id));
        if(!person) return response.status(404).json({error:`no user found with id:${id}`});
       
        return response.status(404).json({person});
    };
    response.status(200).json({users})
return response.send(users)
});

router.post('/users/register', async (req, res) => {

  // first thing is to validate the users's input- using joi 
  const {error, value } = signupUserSchema.validate(req.body);
  
  // throw an error if a field is missing
  if(error) return res.status(400).json({error: error.message});
  
  // destructure user data into variable "value"
  const {id, firstName, lastName, email, password, role, createdAt} = value;

  // check if user already exists with the email
  const user = users.find((user) => 
user.email
 === email);
 
 // throw an error if a user was found with that email
  if(user) return res.status(400).json({error: "Account already exists"});
  
  // // hash, or encrypt user's password before storing into DB
  // const hashedPassword = await hashPassword(password);
  
  // users.push({ id, firstName, lastName, email, password:hashedPassword, role, createdAt});
  return res.status(201).json({message: "user registered sucessfully", users});
});
// const port= 1234
// 'Explain joi'
// router.post('/products', (req, res)=>{
//   // get data from frontend
//   const {error, value}=addProductsSchema.validate(req.body);
//   // throw error if needed
//   if (error) return res.status(400).json({error: error.message});
//   // destructure value coming from frontend
//   const{name, id, price, category}=value;
//   // check if prod
//   // else
  //     res.status(201).json({message:'Products added succes'})
// })
const products = [
  {
    id: 1,
    name: "phone",
 price: 23003,
 category:'electronics'
  },
  {
    id: 2,
    name: "chair",
price:3222,
category:'elite '
  }]
  router.get('/products', (req, res)=>{
    return res.status(200).json({products});
    
  })
router.post('/products', (req, res) => {

  // get data from fontend
  const {error, value} = addProdcutsSchema.validate(req.body);

  // throw an error if needed
  if(error) return res.status(400).json({error: error.message});

  // destructure value coming from frontend
  const {name, id, price, category} = value;

  // check if product exists already
  const productExists = products.find((product) => product.id === value.id);

  // throw an error if product exists
  if(productExists) return res.status(400).json({error: `product exixts with id: ${id}`});

  // save product of no error
  products.push(value);

  return res.status(201).json({message: `Product added successfully`, products});

});
router.delete('/products/:id', (req, res)=> {
  // grab idfrom request params
  const id= req.params.id;
  // check if products exists
  const productExists= products.find((exists)=> exists.id ===parseInt(id));
  // throw error if product is not found
  if (!productExists) return res.status(404).json({error:`product not found with id ${id}`});
  // delete products
  const productLeft=products.filter((p)=> p.id !== parseInt(id));
  // return products left
  return res.status(201).json({message:`product deleted successfully:`, productLeft})
})


router.post('/users/login', async (req, res) => {

  // get data from frontend
  const {email, password} = req.body;

  // validate user's data manually
  if(!email || !password) return res.status(400).json({error: "email and password are rquired"});

  // check if user exists
  const userExists = users.find((user) => user.email === email);

  // throw an error if user is not found
  if(!userExists) return res.status(404).json({error: "User not found. Kindly create an account to login"});

  // check user's password
  const isMatch = await comparePassword(password, );

  // login upon successful validation
  return res.status(200).json({message: "User logged in successfully!"});
  
});
app.listen(config.port, ()=>{
console.log(`server running on http://localhost:${config.port}`);

});


