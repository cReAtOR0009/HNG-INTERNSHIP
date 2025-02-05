import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, email, password } = await req.json();

  await connectDB();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
}