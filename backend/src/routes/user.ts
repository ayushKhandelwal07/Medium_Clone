import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput,signinInput } from "@ayush_227/medium-blog"

export const userRoute = new Hono<{
      Bindings : {
            DATABASE_URL : string,
            JWT_SECRET : string
      }
}>()

// _____SIGN_UP_ROUTE_____
userRoute.post('/signup', async (c) => {
      const body = await c.req.json();  
      const { success }  = signupInput.safeParse(body);

      if(!success){
        c.status(411);
        return c.json({message : "Inputs are invalid"});
      }

      const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
      const user = await prisma.user.create({
        data : {
          username : body.username,
          password : body.password,
          name  :body.name
        }
      })
      const my_secret = c.env.JWT_SECRET
      
      const jwt  = await sign({ id : user.id }, my_secret);
     
      return c.text(jwt)
    
    }catch(err){ 
      console.log("catch error" + err);
      c.status(411);
      return c.text("Sign up Invalid")
    }
    })
    // _________________________________
    
    
    //___________SIGN_IN_ROUTE___________
    
    userRoute.post('/signin' ,async (c) => {
      const body = await c.req.json();
      const success = signinInput.safeParse(body);

      if(!success){
        c.status(411);
        return c.json({
          message : "Inputs are invalid"
        })
      }
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
    
      try {
        const user = await prisma.user.findFirst({
          where : {
            username : body.username,
          }
        });
      
        if(!user){
          c.status(403);
          return c.text("Incorrect creds");
        }
      
        const jwt = await sign({id : user.id  },c.env.JWT_SECRET);
         return c.text(jwt)
    
      }catch(err){
        console.log(err)
        c.status(411);
        return c.text("Invalid");
      }
    })
    //_________________________________
    