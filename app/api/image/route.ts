import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// กำหนด MIME Type ที่อนุญาต
const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

export async function POST(request: Request) {
  try {
    // อ่านข้อมูล body
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const customPath = formData.get('path') as string | undefined;
    // ตรวจสอบว่ามีไฟล์ถูกส่งมาหรือไม่
    if (!file) throw new Error('No file uploaded');
    // ตรวจสอบ MIME Type
    if (!allowedMimeTypes.includes(file.type)) throw new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
    // ตรวจสอบ path และป้องกัน Directory Traversal
    const sanitizedPath = customPath ? path.join('image', path.normalize(customPath).replace(/^(\.\.(\/|\\|$))+/, '')) : 'image';
    // Path สำหรับเก็บไฟล์
    const uploadPath = path.join(process.cwd(), 'public', sanitizedPath);
    await fs.mkdir(uploadPath, { recursive: true });
    let name: string = "";
    switch (customPath) {
      case 'devices':
        name = 'dev';
        break;
      case 'hospitals':
        name = 'hos';
        break;
      case 'users':
        name = 'user';
        break;
      default:
        break;
    }
    // บันทึกไฟล์
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const extArr: string[] = file.name.split('.');
    const fileName = `${name}${Date.now()}.${extArr[extArr.length-1]}`;
    const filePath = path.join(uploadPath, fileName.replaceAll(' ', ''));
    await fs.writeFile(filePath, fileBuffer, { mode: 0o776 });

    return NextResponse.json({
      message: 'File uploaded successfully',
      filePath: `media/image/${customPath}/${fileName.replaceAll(' ', '')}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}