import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findById(userId).select('-password');
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}