import cloudinary from 'cloudinary'

// Configure Cloudinary
cloudinary.v2.config({
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
    const result = await cloudinary.v2.uploader.upload(dataURI, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
    })

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
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
    const result = await cloudinary.v2.uploader.destroy(publicId)
    return { success: true, result }
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return { success: false, error: 'Failed to delete from Cloudinary' }
  }
}

export default cloudinary