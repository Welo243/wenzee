import bcrypt from "bcryptjs"
 
const data ={

    users :[
        {
            name :'welo',
            email:'welo@example.com',
            password:bcrypt.hashSync( '0000', 8),
            isAdmin:true,
        },
  
        {
            name :'pesene',
            email:'pesene@example.com',
            password:bcrypt.hashSync( '1234', 8),
            isAdmin:false,
        },


    ],

    products:[
        {
            
            name:'Nike Slim Shirt',
            category:'Shirts',
            image:'../images/p5.jpg', 
            price:500,
            brand:'Nike',
            rating:47,
            numReviews:10,
            countInStock:0,
            description:'high quality product',
        },

        {
            
            name:'Adidas Slim Shirt',
            category:'Shirts',
            image:'../images/p1.jpg', 
            price:200,
            brand:'Adidas',
            rating:15,
            numReviews:12,
            countInStock:2,
            description:'high quality product',
        },
        {
            
            name:'Mpuma Slim Shirt',
            category:'Shirts',
            image:'../images/p5.jpg', 
            price:520,
            brand:'Nike',
            rating:8,
            numReviews:18,
            countInStock:0,
            description:'high quality product',
        },
        {
            
            name:'Raph Slim Shirt',
            category:'Shirts',
            image:'../images/p5.jpg', 
            price:620,
            brand:'Nike',
            rating:9,
            numReviews:11,
            countInStock:16,
            description:'high quality product',
        },
        {
            name:'Fendi Slim Shirt',
            category:'Shirts',
            image:'../images/p1.jpg', 
            price:400,
            brand:'Nike',
            rating:7,
            numReviews:17,
            countInStock:5,
            description:'high quality product',
        },
        {
            name:'Rock Slim Shirt',
            category:'Shirts',
            image:'../images/p5.jpg', 
            price:720,
            brand:'Nike',
            rating:5,
            numReviews:18,
            countInStock:10,
            description:'high quality product',
        },

    ]
}
export default data;
