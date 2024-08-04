import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {createBlogInput , updateBlogInput} from "@ayush_227/medium-blog"

export const blogRoute = new Hono<{
      Bindings : {
            DATABASE_URL : string,
            JWT_SECRET : string ,
      },
      Variables : {
            userId : string
      }
}>();

blogRoute.use("/*" , async (c,next) => {
      const authHeader = c.req.header("Authorization") || "";

      try{
            const user = await verify(authHeader , c.env.JWT_SECRET);
            if(user){
            c.set("userId" , user.id as string);
            await next();
      }

      }catch(err){
            c.status(403);
            return c.json({
                  msg : "You are not logged in"
            });
      }
})

//___________creating a new blog_______
blogRoute.post('/', async (c) => {
      const body = await c.req.json();
      const success = createBlogInput.safeParse(body);

      if(!success){
            c.status(411)
            return c.json({message : 'Inputs are invalid'});
      }

      const authorId = c.get("userId");
      const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());

      const blog  = await prisma.blog.create({
            data : {
                  title : body.title,
                  content : body.content,
                  authorId : Number(authorId)
            }
      }) 

      return c.json({
            id : blog.id 
      })
})

//_______________updating a content______
blogRoute.put('/', async (c) => {
      const body   = await c.req.json();
      const success = updateBlogInput.safeParse(body);

      if(!success){
            c.status(411);
            return c.json({message : "Inputs are invalid"});
      }


      const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const blog = await prisma.blog.update({
            where : {
                  id : body.id
            },
            data : {
                  title : body.title,
                  content : body.content
            }
      })


      return c.json({
            msg : "Data is updated" + blog
      })
})

//____________gettig all the blog_____________
blogRoute.get('/bulk', async (c) => {
      const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
      }).$extends(withAccelerate());

      const blogs = await prisma.blog.findMany({
            select : {
                  id : true,
                  title : true,
                  content : true,
                  auhtor : {
                        select : {
                              name : true
                        }
                  }
            }
      });


      return c.json({
            blogs
      })
})

//__________getting specific blog using it's id
blogRoute.get('/:id', async (c) => {
      const id =  c.req.param("id");
      const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
      }).$extends(withAccelerate());

      try{
            const blog = await prisma.blog.findFirst({
                  where : {
                        id : Number(id)
                  },
                  select : {
                        id : true,
                        title : true,
                        content  :true,
                        auhtor : {
                              select : {
                                    name : true
                              }
                        }
                  }
            });

            return c.json({blog});
      }catch(err){
            c.status(411);
            return c.json('Error while fetching blog')
      }
})

