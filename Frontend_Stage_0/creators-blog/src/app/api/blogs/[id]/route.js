import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Blog from '../../models/Blog';

export async function GET(req, { params }) {
  const { id } = params;

  await connectDB();
  const blog = await Blog.findById(id).populate('author', 'name');
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json(blog, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { title, content, image, tags } = await req.json();

  await connectDB();
  const blog = await Blog.findByIdAndUpdate(id, { title, content, image, tags }, { new: true });
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json(blog, { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await connectDB();
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
}