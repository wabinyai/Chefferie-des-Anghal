import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';

const cloudinaryUrl = process.env.CLOUDINARY_URL;
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudinaryUrl && (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret)) {
  throw new Error('Cloudinary environment variables are required: either CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
}

cloudinary.config({
  secure: true,
  ...(
    cloudinaryUrl
      ? { cloudinary_url: cloudinaryUrl }
      : {
          cloud_name: cloudinaryCloudName,
          api_key: cloudinaryApiKey,
          api_secret: cloudinaryApiSecret
        }
  )
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
