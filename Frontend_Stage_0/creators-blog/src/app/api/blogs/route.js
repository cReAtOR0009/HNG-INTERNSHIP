import { NextResponse } from 'next/server';
// import connectDB from '../../lib/db';
import connectDatabase from "../../lib/db"
import Blog from '../../models/Blog';

export async function GET() {
  await connectDatabase();
  const blogs = await Blog.find().populate('author', 'name');
  return NextResponse.json(blogs, { status: 200 });
}

export async function POST(req) {
  const { title, content, author, image, tags } = await req.json();

  await connectDB();
  const blog = await Blog.create({ title, content, author, image, tags });

  return NextResponse.json(blog, { status: 201 });
}