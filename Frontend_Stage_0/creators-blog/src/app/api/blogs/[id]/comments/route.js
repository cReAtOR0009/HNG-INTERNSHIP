import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Blog from '../../models/Blog';

export async function POST(req, { params }) {
  const { id } = params;
  const { text, author } = await req.json();

  await connectDB();
  const blog = await Blog.findByIdAndUpdate(
    id,
    { $push: { comments: { text, author } } },   
    { new: true }
  );

  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json(blog, { status: 200 });
}