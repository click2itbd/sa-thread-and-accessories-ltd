import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { getAdminFromRequest } from "@/lib/adminAuth";

function getImageKit() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  if (!publicKey || !privateKey || !urlEndpoint) {
    return null;
  }
  return new ImageKit({ publicKey, privateKey, urlEndpoint });
}

export async function POST(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const imagekit = getImageKit();
    if (!imagekit) {
      return NextResponse.json(
        { error: "ImageKit credentials not configured in environment" },
        { status: 500 }
      );
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
