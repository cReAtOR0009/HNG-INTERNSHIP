import axios from 'axios';


export default async function BlogPage({ params }) {
  const { data: blog } = await axios.get(`/api/blogs/${params.id}`);

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}