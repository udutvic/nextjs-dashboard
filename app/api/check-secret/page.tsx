import { NextResponse } from 'next/server';

export async function GET() {
  console.log("AUTH_SECRET:", process.env.AUTH_SECRET); // Перевірка значення
  return NextResponse.json({ message: 'Перевірка виконана. Подивіться консоль Vercel.' });
}
