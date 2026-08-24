import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(file: File, folder: string = 'gllia') {
  try {
    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
    })

    // ✅ SHORTEN THE URL - Remove version number
    const shortUrl = result.secure_url.replace(/\/v\d+\//, '/')

    return {
      success: true,
      url: shortUrl,  // ✅ Short URL (no version number)
      public_id: result.public_id,
      full_url: result.secure_url,  // Keep full URL if needed
      width: result.width,
      height: result.height,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return {
      success: false,
      error: 'Failed to upload to Cloudinary',
    }
  }
}

export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return { success: true, result }
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return { success: false, error: 'Failed to delete from Cloudinary' }
  }
}

// ✅ Helper function to generate optimized URLs
export function getOptimizedImageUrl(publicId: string, options?: {
  width?: number
  height?: number
  crop?: 'fill' | 'fit' | 'limit' | 'scale'
  quality?: 'auto' | number
  format?: 'auto' | 'jpg' | 'png' | 'webp'
}) {
  const config: any = {
    fetch_format: options?.format || 'auto',
    quality: options?.quality || 'auto',
  }

  if (options?.width || options?.height) {
    config.crop = options?.crop || 'fill'
    config.width = options?.width
    config.height = options?.height
  }

  return cloudinary.url(publicId, config)
}

export default cloudinary