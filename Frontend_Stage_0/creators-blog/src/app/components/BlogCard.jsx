import Link from 'next/link';
import { FaUser, FaCalendar, FaHeart, FaComment } from 'react-icons/fa';

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail Image */}
      <img
        src={blog.image || '/default-thumbnail.jpg'} // Fallback image if no thumbnail is provided
        alt={blog.title}
        className="w-full h-48 object-cover"
      />

      {/* Blog Content */}
      <div className="p-6">
        {/* Title */}
        <Link href={`/blogs/${blog._id}`}>
          <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors duration-300">
            {blog.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4">
          {blog.content.substring(0, 100)}... {/* Show only the first 100 characters */}
        </p>

        {/* Metadata (Author and Date) */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaUser className="mr-2" />
          <span>{blog.author?.name || 'Unknown Author'}</span>
          <FaCalendar className="ml-4 mr-2" />
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Engagement Metrics (Likes and Comments) */}
        <div className="flex items-center text-sm text-gray-500">
          <FaHeart className="mr-2" />
          <span>{blog.likes || 0} Likes</span>
          <FaComment className="ml-4 mr-2" />
          <span>{blog.comments?.length || 0} Comments</span>
        </div>
      </div>
    </div>
  );
}