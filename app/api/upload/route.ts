import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: 'Cloudinary is not configured on the server' },
      { status: 500 }
    )
  }

  const contentType = request.headers.get('content-type') || ''
  if (!contentType.startsWith('multipart/form-data')) {
    return NextResponse.json(
      { error: 'Invalid content type, expected multipart/form-data' },
      { status: 400 }
    )
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file field' }, { status: 400 })
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image uploads are allowed' }, { status: 400 })
  }

  const maxSizeBytes = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSizeBytes) {
    return NextResponse.json(
      { error: '图片大小不能超过 5MB，请压缩后重试' },
      { status: 400 }
    )
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'maison-bags',
          resource_type: 'image',
        },
        (error, result) => {
          if (error || !result) {
            return reject(error)
          }
          resolve(result)
        }
      )

      stream.end(buffer)
    })

    return NextResponse.json(
      {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Cloudinary upload failed', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

