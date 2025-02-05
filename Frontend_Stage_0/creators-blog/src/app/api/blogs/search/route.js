import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Blog from '../../../models/Blog';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  await connectDB();
  const blogs = await Blog.find({ $text: { $search: query } }).populate('author', 'name');
  return NextResponse.json(blogs, { status: 200 });
}