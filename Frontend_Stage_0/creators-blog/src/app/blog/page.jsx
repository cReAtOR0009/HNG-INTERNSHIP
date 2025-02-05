import BlogCard from '@/components/BlogCard';
import axios from 'axios';

export default async function BlogsPage() {
  const { data: blogs } = await axios.get('/api/blogs');

  return (
    <div>
      <h1>All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}