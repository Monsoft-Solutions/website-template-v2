import { put } from '@vercel/blob'

import { env } from '@/env'

/**
 * Upload result containing URL and metadata
 */
export type UploadImageResult = {
    url: string
    mimeType: string
    originalFilename: string
}

/**
 * Download an image from a URL and upload it to Vercel Blob
 * @param imageUrl - The URL of the image to download
 * @param filename - The filename to use in Vercel Blob
 * @returns The URL of the uploaded image, mime type, and original filename
 * @throws Error if download or upload fails
 */
export async function uploadImageToBlob(
    imageUrl: string,
    filename: string
): Promise<UploadImageResult> {
    try {
        // Download the image
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; BlogImageUploader/1.0)',
            },
        })

        if (!response.ok) {
            throw new Error(
                `Failed to download image: ${response.status} ${response.statusText}`
            )
        }

        // Check content-type is an image
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.startsWith('image/')) {
            throw new Error(
                `Invalid content type: ${contentType}. Expected image/*`
            )
        }

        // Get blob from response
        const blob = await response.blob()

        // Check file size (5MB max)
        const MAX_FILE_SIZE = 5 * 1024 * 1024
        if (blob.size > MAX_FILE_SIZE) {
            throw new Error(
                `Image too large: ${(blob.size / 1024 / 1024).toFixed(2)}MB. Maximum is 5MB`
            )
        }

        // Upload to Vercel Blob
        const blobToken = env.BLOB_READ_WRITE_TOKEN
        if (!blobToken) {
            throw new Error(
                'BLOB_READ_WRITE_TOKEN environment variable not set'
            )
        }

        const uploadedBlob = await put(filename, blob, {
            access: 'public',
            token: blobToken,
        })

        return {
            url: uploadedBlob.url,
            mimeType: contentType,
            originalFilename: filename,
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error)
        console.error(`Image upload failed for ${imageUrl}:`, errorMessage)
        throw new Error(`Failed to upload image: ${errorMessage}`)
    }
}
