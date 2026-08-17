import { NextResponse } from "next/server";
import { ImageKit } from "@imagekit/nodejs";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name || `upload-${Date.now()}`,
      folder: "sathread/admin",
    });

    return NextResponse.json({ url: result.url, fileId: result.fileId, isImage: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
