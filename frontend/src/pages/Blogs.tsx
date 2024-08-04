import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../Hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>
      <Appbar />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />

      </div>
  }

  return (<>
    <div>
      <Appbar />
      <div className="flex justify-center ">
        <div className="">
          {(blogs || []).map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.auhtor?.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};
