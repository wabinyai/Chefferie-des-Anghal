import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary environment variables are required');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function uploadImage(url: string, publicId: string, folder = 'anghal/gallery') {
  const options: UploadApiOptions = {
    public_id: publicId,
    folder,
    overwrite: false,
    resource_type: 'image',
    use_filename: true,
    unique_filename: true,
    transformation: [
      { fetch_format: 'auto', quality: 'auto' }
    ]
  };

  return await cloudinary.uploader.upload(url, options);
}

export function getOptimizedImage(publicId: string, width = 1200, height?: number) {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    width,
    height,
    crop: height ? 'fill' : 'limit',
    gravity: 'auto'
  });
}

export function getAutoCropSquare(publicId: string, size = 500) {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    crop: 'fill',
    gravity: 'auto',
    width: size,
    height: size
  });
}

export default cloudinary;
