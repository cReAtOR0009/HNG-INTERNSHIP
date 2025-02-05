import connectDB from '../../lib/db';
import Blog from '../../models/Blog';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, content } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const blog = await Blog.create({ title, content, author: userId });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}