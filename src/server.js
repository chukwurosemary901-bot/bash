import express from'express';
import {Router} from 'express';
import { config } from './config/env.js';
import { comparePassword, hashPassword }  from '../utilis/bcrypt.js';
import { realproduct } from './validators/products.js';
import { userReg } from './validators/users.js';
import { aToken } from './tokens/jwt.js';
import { auth, staffAuth } from './middleware/auth.js';
import { rToken } from './tokens/jwt.js';
import { sequelize } from './config/sequelize.js';

const app= express();
const router= Router();
app.use(express.json())
app.use(router);
// const abc= users.find((x)=> x.id===parseInt (2));
// abc.id=10;

// router.get('/',(request, response)=>{
//     return response.send('hi');
// });
// // router.get('/users',(request, response)=>{
// //     return response.send(users);
// // });




// router.get('/users', (request, response)=>{

//     const {age}= request.query;
//     if(age){
//         const person = users.find((user)=> user.age === parseInt(age));
//         if(!person) return response.status(404).json({error:`no user found with id:${id}`
        
//         });

//         return response.status(200).json({person});
//     };
//     // response.status(200).json({users})
// // return response.send(users)
// });



// router.post('/users', (req, res)=>{
//   const {id, name, email, age, role, active}=req.body
// if(!id)return res.status(400).json({error:`log in the id field`});
// if(!name)return res.status(400).json({error:`log in the name field`});
// if(!email)return res.status(400).json({error:`log in the email field`});
// const checkemail=users.find((x)=> x.email===email)
// if(checkemail) res.status(400).json({error:`email already exists`});
// users.push(id, name, email, age, role, active)
// return res.status(200).json({message:`successful registration`,users})
// })



const user = [
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
  }]
// REGISTRATION

router.post('/users/register', async (req, res) => {

  // first thing is to validate the users's input- using joi 
  const {error, value } = userReg.validate(req.body);
  
  // throw an error if a field is missing
  if(error) return res.status(400).json({error: error.message});
  
  // destructure user data into variable "value"
  let {id, firstName, lastName, email, password, role, createdAt} = value;

  // check if user already exists with the email
  const user = users.find((user) => 
user.email
 === email);
 
 // throw an error if a user was found with that email
  if(user) return res.status(400).json({error: "Account already exists"});
  
  // // hash, or encrypt user's password before storing into DB
  const hashedPassword = await hashPassword(password);

  value.password = hashedPassword
  
  ///////users.push({ id, firstName, lastName, email, password:hashedPassword, role, createdAt});
  users.push(value);
  return res.status(201).json({message: "user registered sucessfully", users});
});

// router.post('/users/login', async (req, res)=> {

//     // get data from frontend
//   const {email} = req.body;

//   // validate user's data manually
//   if(!email ) return res.status(400).json({error: "email and password are rquired"});

//   // check if user exists
//   const userExists = users.find((user) => user.email === email);

//   // throw an error if user is not found
//   if(!userExists) return res.status(404).json({error: "User not found. Kindly create an account to login"});

//   // check user's password
//   const isMatch = await comparePassword(password, userExists.password );
// // throw an error if theres's no match
// if(!isMatch) return realproduct.status(400).json({error:"Invalid Credentials"})
// const id= userExists.id;
// const role= userExists.role
// const accessToken= aToken({id, role});
//   // login upon successful validation
//  users.filter((user)=>user.email === email )
//   return res.status(200).json({message: "User logged in successfully!",accessToken})});
  
// // });
// // // const port= 1234
// // // 'Explain joi'
// // // router.post('/products', (req, res)=>{
// // //   // get data from frontend
// // //   const {error, value}=addProductsSchema.validate(req.body);
// // //   // throw error if needed
// // //   if (error) return res.status(400).json({error: error.message});
// // //   // destructure value coming from frontend
// // //   const{name, id, price, category}=value;
// // //   // check if prod
// // //   // else
// //   //     res.status(201).json({message:'Products added succes'})
// // // })



// //   router.get('/products', (req, res)=>{
//   //     return res.status(200).json({products});
  
//   //   })
//   // router.post('/products', (req, res) => {
    
// //   // get data from fontend
// //   const {error, value} = realproduct.validate(req.body);

// //   // // throw an error if needed
// //   if(error) return res.status(400).json({error: error.message});

// //   // // destructure value coming from frontend
// //   const {name, id, price, category} = value;

// //   // // check if product exists already
// //   const productExists = products.find((product) => product.id === value.id);

// //   // // throw an error if product exists
// //   if(productExists) return res.status(400).json({error: `product exixts with id: ${id}`});

// //   // // save product of no error
// //   products.push(value);

// //   return res.status(201).json({message: `Product added successfully`, products});

// // });




// // router.delete('/products/:id', (req, res)=> {
// //   // grab idfrom request params
// //   const id= req.params.id;
// //   // check if products exists
// //   const productExists= products.find((exists)=> exists.id =(id));
// //   // throw error if product is not found
// //   if (!productExists) return res.status(404).json({error:`product not found with id ${id}`});
// //   // delete products
// //   const productLeft=products.filter((p)=> p.id !== parseInt(id))
// //   // return products left
// //   return res.status(201).json({message:`product deleted successfully:`, productLeft})
// // })




// // router.patch('/users/:id', (req, res) => {
// //   // extract id from query params
// //   const id = req.params.id;
// //   // check if user with id exists
// //   const userExists = user.find((user) => user.id === id);
// //   // return an error if user doesnt exist
// //   if(!userExists) return res.status(404).json({error: `user not found with id ${id}`});
// //   // edit user attributes if no error is found
// //   Object.assign(userExists, req.body);
// //   return res.json({message: "User Updated Successfully", user});
// // })
const users = [
{
  id: 1,
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  age: 28,
  role: "admin",
  active: true,
  password:12345678
},
{
  id: 2,
  name: "Ben Carter",
  email: "ben.carter@example.com",
  age: 35,
  role: "editor",
  active: true,
   password:123245678
},
{
  id: 3,
  name: "Clara Kim",
  email: "clara.kim@example.com",
  age: 24,
  role: "viewer",
  active: false,
   password:123435678
},
{
  id: 4,
  name: "David Lopez",
  email: "david.lopez@example.com",
  age: 42,
  role: "editor",
  active: true,
   password:123455678
},
{
  id: 5,
  name: "Ella Brown",
  email: "ella.brown@example.com",
  age: 30,
  role: "viewer",
  active: false,
   password:123645678
}

];
router.get('/', (req, res)=>{
return res.send((users.filter(user=>user.email===email)));
  
})

// router.get('/users', (req, res)=>{
//   return res.send(users)
// })

router.get('/users', (req, res)=>{
  // get id from frontend
const{id}=req.query;
if(id){
    const idExists= users.find((user)=>user.id===parseInt(id))
    if(!idExists){return res.status(404).json({error:`Id not found`})}
return res.send(idExists)

};
});


// REGISTRATION
router.post('/users/reg',(req, res)=>{

  // grab data
  const{id, name, email, age ,role, active, password}=req.body

  // destructure the data
  if(!id){return res.status(404).json({error:`pls fill out id fields`})}
  if(!name){return res.status(404).json({error:`pls fill out name fields`})}
  if(!age){return res.status(404).json({error:`pls fill out age fields`})}

  // check if email exists
  if(email){   const Useremail=users.find((user)=>user.email === email)
    if(Useremail){return res.status(404).json({error:`email already exists`})}}
 
  
  users.push({id, name, email, age ,role, active, password})
  return res.status(201).json({message:"Successfully registered", users })

});
router.post('/users/register', async (req, res)=>{
   const {error, value}= userReg.validate(req.body)
//  if there is an error from he frontened
 if(error){return res.status(404).json({error:error.message})}

//  destructure the data from frontend
const{id, firstName, lastName, email, password, role, createdAt,}=value

// check if email exists
if(email){
  const emailExist=users.find((user)=>user.email === email)
  if(emailExist){return res.status(404).json({error:`email already exists`})}
}
// encrypt password
value.password= await hashPassword(password)
users.push(value)
return res.status(201).json({message:`Successfully registered` ,users})
});

// let refreshTokens=[]
// LOGIN
router.post('/users/login', async (req, res)=>{
// grab data from frontend
const{email, password}=req.body
if(!email ){return res.status(202).json({error:'pls fill in details correctly'})}
// check if user exists
    const Usersemail=users.find((user)=>user.email===email)
  if(!Usersemail){return res.status(404).json({error:'Wrong email'})}
// check users password
const passmatch=await comparePassword(password, Usersemail.password)
if(!passmatch)return res.status(400).json({error:'Invalid Credentials'})

// check if password is correct
// if(password){
//   const checkpass=users.find((user)=>user.password===password)
//   if(!checkpass){
//     return res.status(404).json({error:'Password is not correct'})
//   }
// // }
// const filter= users.filter((user)=>user.password===password)
const id= Usersemail.id
const role=Usersemail.role
const accessToken= aToken({id, role})
const refreshToken= rToken({id, role})
refreshTokens.push(refreshToken)
return res.status(201).json({message:'You have successfully logged in', accessToken, refreshToken})
})
router.post('/tokens', (req, res)=>{
  const refreshToken=req.body.token
 if(refreshToken===null)return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken))return res.sendStatus(401)
    jwt.verify (refreshToken, config.refresh, (err, user)=>{
  if(err)return res.sendStatus(403)
    const accessToken= aToken({id, role})
  res.json({accessToken})
    })
})

// EDITING A USERS DETAILS
router.patch('./users', (req, res)=>{
  const{id}=req.query;
  if(!id){
    res.status(404).json({error:'pls fill in details'})
  }
  // Check if user with that id exist
  if(id){ 
    const userExists=users.find((user)=>user.id===parseInt(id))
    if(!userExists){return res.status(400).json({error:'not available'})}
  }
Object.assign(userExists, req.body);
  return res.status(201).json({message:'Success', users})
})





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
//     router.get('/products', (req, res)=>{
// return res.status(201).json({message:'All products', products})
//     })

// GETTING A PRDUCT
router.get('/products', (req, res)=>{
 
  const{id}=req.query
if(!id){
  return res.status(404).json({message:'pls input a valid id'})
}
// check if id exists
if(id){
  const checkid= products.find((product)=>product.id===parseInt(id))
if(!checkid){return res.status(404).json({error:`pls enter a valid id, id ${id} does not exists`})}

return res.status(201).json({checkid})
}
})

// ADDING PRODUCTS
router.post('/products', auth, staffAuth,(req, res)=>{
const{ id, name, price, category}=req.body
// check if products exists using name
const Checkproduct= products.find((prod)=>prod.name===name)
if(Checkproduct){return res.status(404).json({error:`name of products already exists`})}
// check if products id exist
// push your values into the list
products.push({id, name, price, category})
return res.status(201).json({message:'successful', products})
})
// DELETING PRODUCTS

// 
router.delete('./products', (req, res)=>{
const {id}= req.query
if(id){
  const Checkid= products.filter((product)=>product.id===parseInt(id))
  if(!Checkid){return res.status(404).json({error:'not found'})}
}
products.filter(!Checkid)
return res.json({error:'success', products})
})
app.listen(config.port, async()=>{
   await sequelize.authenticate();
  console.log('Connection has been established successfully.')
console.log(`server running on http://localhost:${config.port}`);

});


