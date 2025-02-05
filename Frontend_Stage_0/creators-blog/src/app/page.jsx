import BlogCard from './components/BlogCard' ;
import axios from 'axios';

export default async function Home() {
  // Fetch blog data from the API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const { data: blogs } = await axios.get(`${baseUrl}/api/blogs`);

console.log("blogs----", blogs)
  return ( 
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render blog cards */}
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}