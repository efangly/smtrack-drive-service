import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const fileName = (await params).slug;
    console.log(fileName);
    const filePath = path.join(process.cwd(), `public/image/devices/${fileName}`);
    const files = fs.readFileSync(filePath);
    return new NextResponse(files, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const fileName = (await params).slug;
    console.log(fileName);
    const filePath = path.join(process.cwd(), `public/image/devices/${fileName}`);
    fs.rmSync(filePath, { recursive: true });
    return NextResponse.json({ message: 'File deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}