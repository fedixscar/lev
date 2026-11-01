import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("video") as File | null;
    const slug = (formData.get("slug") as string) || "product";

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier vidéo fourni" }, { status: 400 });
    }

    // Validate MIME type
    const mime = file.type.toLowerCase();
    const validMimes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
    if (!validMimes.some((m) => mime.includes(m.split("/")[1]))) {
      return NextResponse.json(
        { error: "Format vidéo non supporté. Veuillez utiliser un fichier MP4 ou WebM." },
        { status: 400 }
      );
    }

    // Max size: 50MB
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "La taille de la vidéo dépasse la limite de 50 Mo." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "mp4";
    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const filename = `${safeSlug}-${Date.now()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "videos");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    const videoUrl = `/videos/${filename}`;

    return NextResponse.json({
      success: true,
      videoUrl,
      filename,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error("Video upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Erreur lors du téléversement de la vidéo" },
      { status: 500 }
    );
  }
}
