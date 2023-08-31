import S3 from 'aws-sdk/clients/s3'
import { type NextRequest, NextResponse } from 'next/server'
const BUCKET_NAME = process.env.BUCKET_NAME ?? 'codely-course-test'
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-1'
})

export const dynamic = 'force-dynamic'

export async function POST (req: NextRequest, res: NextResponse) {
  const formData = await req.formData()
  const objFile = Object.fromEntries(formData)

  const fileBlob: Blob = objFile.file as Blob
  const buffer = await fileBlob.arrayBuffer()
  const fileBuffer = Buffer.from(buffer)

  const [,fileExtension] = fileBlob.type.split('/')

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${fileBlob.name.substring(0, 25)}_${Date.now()}.${fileExtension}`,
    Body: fileBuffer,
    Tagging: 'auto-delete=true'
  }

  try {
    await s3.upload(params).promise()
    const signedUrl = await s3.getSignedUrlPromise('getObject', {
      Bucket: BUCKET_NAME,
      Key: params.Key,
      Expires: 3600
    })
    const response = {
      signedUrl,
      size: fileBlob.size,
      type: fileBlob.type,
      name: fileBlob.name
    }
    return NextResponse.json(response)
  } catch (error) {
    console.error(error)
    NextResponse.json({ error: 'Error uploading file to S3' })
  }
}
