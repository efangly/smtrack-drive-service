import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const type = (await params).id;
    if (!fs.existsSync(`public/image/${type}`)) fs.mkdirSync(`public/image/${type}`, { recursive: true });
    const uploadPath = path.join(process.cwd(), `public/image/${type}`); // โฟลเดอร์ที่เก็บไฟล์
    const files = fs.readdirSync(uploadPath); // อ่านชื่อไฟล์ทั้งหมด
    const fileUrls = files.map((file) => ({ name: file, url: `media/image/${type}/${file}` }));
    return NextResponse.json({ files: fileUrls });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}