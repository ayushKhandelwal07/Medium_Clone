import { useParams } from "react-router-dom";
import { useBlog } from "../Hooks"
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import {  SingleSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
      const {id} = useParams()
      const {loading , blog} = useBlog({
            id : id || ""
      });
      
      if(loading) {
      return (
            <div>
                  <Appbar />
                  <SingleSkeleton />
            </div>
      )}
      if (!blog) {
      return (
            <div>
            Blog not found.
            </div>
      );
}
      return <div>
            <FullBlog blog={blog}/> 
      </div>
}