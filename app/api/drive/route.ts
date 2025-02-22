import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) throw new Error('No file uploaded');
    const uploadPath = path.join(process.cwd(), 'public/drive');
    fs.mkdirSync(uploadPath, { recursive: true });
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadPath, file.name.replaceAll(' ', ''));
    fs.writeFileSync(filePath, fileBuffer, { mode: 0o776 });
    return NextResponse.json({
      message: 'File uploaded successfully',
      filePath: `media/${file.name.replaceAll(' ', '')}`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    if (!fs.existsSync(`public/drive`)) fs.mkdirSync(`public/drive`, { recursive: true });
    const uploadPath = path.join(process.cwd(), 'public/drive');
    const files = fs.readdirSync(uploadPath);
    const fileUrls = files.map((file) => ({ name: file, url: `media/${file}` }));
    return NextResponse.json({ files: fileUrls });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}