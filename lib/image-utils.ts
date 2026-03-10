/**
 * 商品图展示用：letterbox 思路——不裁剪原图，只做等比缩放（控制分辨率），
 * 展示时在固定比例容器内 object-contain，留白由背景色填充，适配任意输入分辨率/宽高比。
 * 非 Cloudinary 的 URL 原样返回。空值返回空字符串（调用方用 placeholder）。
 */
const CLOUDINARY_TRANSFORM = 'w_800,c_fit,q_auto'

export function getProductImageUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string') return ''
  if (!url.includes('res.cloudinary.com')) return url
  return url.replace(
    /(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload)\/(.+)/,
    `$1/${CLOUDINARY_TRANSFORM}/$2`
  )
}
