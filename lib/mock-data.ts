import type { Product, Story, LookbookItem, Inquiry, Order } from './types'
import type { Locale } from './i18n'
import { getLocalizedTitle } from './types'

// ── Products (aligned with new DB schema) ──

export const products: Product[] = [
  {
    id: '1',
    slug: 'maison-tote',
    titleEn: 'Maison Tote',
    titleZh: 'Maison Tote',
    collection: 'Classique',
    category: 'tote',
    material: 'Togo Calfskin',
    size: '30 x 22 x 14 cm',
    weight: '680g',
    moq: 1,
    productionTime: '2-3 weeks',
    customizationAvailable: true,
    status: 'active',
    descriptionEn: 'A classic tote crafted with exquisite handwork, made from premium Togo calfskin with a soft and delicate texture. The streamlined silhouette and refined metal hardware perfectly embody everyday elegance.',
    descriptionZh: '以精湛手工艺打造的经典托特包，采用顶级 Togo 小牛皮，触感柔软细腻。简约利落的廓形与精致的金属配件，完美诠释日常优雅。内设多功能隔层，兼顾美观与实用。',
    careInstructions: ['请使用柔软干布轻轻擦拭', '避免长时间阳光直射', '存放时请填充定型纸并置于防尘袋中', '远离水源与化学制品'],
    features: ['手工缝制', '镀钯金属配件', '可拆卸肩带', '内置拉链口袋', '磁扣开合'],
    variants: [
      {
        id: '1-black',
        colorName: '经典黑',
        colorHex: '#1a1a1a',
        images: [
          { id: '1-b-1', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop', alt: 'Maison Tote Black Studio', type: 'studio', orderIndex: 0 },
          { id: '1-b-2', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop', alt: 'Maison Tote Black Lifestyle', type: 'lifestyle', orderIndex: 1 },
          { id: '1-b-3', url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop', alt: 'Maison Tote Black Detail', type: 'detail', orderIndex: 2 },
        ],
        price: 32800,
        compareAtPrice: 36800,
        inventory: 3,
        sku: 'MT-BLK-001',
        isDefault: true,
      },
      {
        id: '1-camel',
        colorName: '焦糖棕',
        colorHex: '#C19A6B',
        images: [
          { id: '1-c-1', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop', alt: 'Maison Tote Camel Studio', type: 'studio', orderIndex: 0 },
          { id: '1-c-2', url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=1000&fit=crop', alt: 'Maison Tote Camel Lifestyle', type: 'lifestyle', orderIndex: 1 },
        ],
        price: 32800,
        inventory: 5,
        sku: 'MT-CML-001',
        isDefault: false,
      },
      {
        id: '1-cream',
        colorName: '奶油白',
        colorHex: '#F5F0E8',
        images: [
          { id: '1-cr-1', url: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&h=1000&fit=crop', alt: 'Maison Tote Cream Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 34800,
        inventory: 2,
        sku: 'MT-CRM-001',
        isDefault: false,
      },
    ],
    tags: ['经典', '通勤', '百搭'],
    isNew: false,
    isFeatured: true,
    createdAt: '2025-01-15',
  },
  {
    id: '2',
    slug: 'petite-fleur',
    titleEn: 'Petite Fleur',
    titleZh: 'Petite Fleur',
    collection: 'Printemps',
    category: 'crossbody',
    material: 'Epsom Calfskin',
    size: '22 x 16 x 8 cm',
    weight: '420g',
    moq: 1,
    productionTime: '2-3 weeks',
    customizationAvailable: true,
    status: 'active',
    descriptionEn: 'An exquisite crossbody bag inspired by French gardens. The Epsom leather features a clear texture that is scratch-resistant. The adjustable chain strap makes it suitable for day and night.',
    descriptionZh: '精巧别致的斜挎包，灵感源自法式花园。Epsom 皮革纹理清晰，耐磨且不易留痕。可调节链条肩带，日夜皆宜，从日间约会到晚宴场合，轻松切换。',
    careInstructions: ['请使用柔软干布轻轻擦拭', '避免与粗糙表面摩擦', '存放时请置于防尘袋中'],
    features: ['镀金链条肩带', '翻盖磁扣', '内置卡位', '可调节链条长度'],
    variants: [
      {
        id: '2-rose',
        colorName: '玫瑰粉',
        colorHex: '#D4A0A0',
        images: [
          { id: '2-r-1', url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop', alt: 'Petite Fleur Rose Studio', type: 'studio', orderIndex: 0 },
          { id: '2-r-2', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop', alt: 'Petite Fleur Rose Lifestyle', type: 'lifestyle', orderIndex: 1 },
        ],
        price: 24800,
        inventory: 4,
        sku: 'PF-RSE-001',
        isDefault: true,
      },
      {
        id: '2-noir',
        colorName: '墨黑',
        colorHex: '#0D0D0D',
        images: [
          { id: '2-n-1', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop', alt: 'Petite Fleur Black Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 24800,
        inventory: 6,
        sku: 'PF-BLK-001',
        isDefault: false,
      },
      {
        id: '2-sage',
        colorName: '鼠尾草绿',
        colorHex: '#9CAF88',
        images: [
          { id: '2-s-1', url: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&h=1000&fit=crop', alt: 'Petite Fleur Sage Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 26800,
        inventory: 1,
        sku: 'PF-SGE-001',
        isDefault: false,
      },
    ],
    tags: ['优雅', '约会', '小巧'],
    isNew: true,
    isFeatured: true,
    createdAt: '2025-11-01',
  },
  {
    id: '3',
    slug: 'voyage-weekender',
    titleEn: 'Voyage Weekender',
    titleZh: 'Voyage Weekender',
    collection: 'Travel',
    category: 'tote',
    material: 'Clemence Calfskin',
    size: '45 x 30 x 20 cm',
    weight: '1200g',
    moq: 1,
    productionTime: '3-4 weeks',
    customizationAvailable: true,
    status: 'active',
    descriptionEn: 'A spacious weekender bag designed for travel. The Clemence calfskin offers a rich, supple texture that improves with age. Wide compartments and functional pockets make it the ideal travel companion.',
    descriptionZh: '为旅途而生的大容量周末旅行包。Clemence 牛皮质感浑厚，越用越润。宽敞主仓搭配多功能口袋，是短途出行的理想伴侣。底部金属脚钉保护包身，细节之处尽显匠心。',
    careInstructions: ['请使用皮革保养油定期护理', '避免过度装载', '存放时请保持包型'],
    features: ['双提手', '可拆卸肩带', '底部金属脚钉', '内置拉链口袋', 'YKK拉链'],
    variants: [
      {
        id: '3-cognac',
        colorName: '干邑棕',
        colorHex: '#8B4513',
        images: [
          { id: '3-co-1', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop', alt: 'Voyage Weekender Cognac Studio', type: 'studio', orderIndex: 0 },
          { id: '3-co-2', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop', alt: 'Voyage Weekender Cognac Lifestyle', type: 'lifestyle', orderIndex: 1 },
        ],
        price: 45800,
        inventory: 2,
        sku: 'VW-COG-001',
        isDefault: true,
      },
      {
        id: '3-midnight',
        colorName: '午夜蓝',
        colorHex: '#1B2A4A',
        images: [
          { id: '3-m-1', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop', alt: 'Voyage Weekender Midnight Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 45800,
        inventory: 3,
        sku: 'VW-MID-001',
        isDefault: false,
      },
    ],
    tags: ['旅行', '大容量', '经典'],
    isNew: false,
    isFeatured: false,
    createdAt: '2025-06-20',
  },
  {
    id: '4',
    slug: 'miniature-kelly',
    titleEn: 'Miniature Kelly',
    titleZh: 'Miniature Kelly',
    collection: 'Classique',
    category: 'clutch',
    material: 'Box Calfskin',
    size: '18 x 12 x 6 cm',
    weight: '280g',
    moq: 1,
    productionTime: '3-4 weeks',
    customizationAvailable: false,
    status: 'active',
    descriptionEn: 'A tribute to the classic Kelly in miniature form. Made from precious Box calfskin with a mirror-smooth surface. The delicate turnlock and flowing lines make it the perfect choice for evening events.',
    descriptionZh: '致敬经典的迷你 Kelly，采用珍贵 Box 小牛皮，表面光滑如镜。精巧转锁与流畅线条，是晚宴与正式场合的不二之选。附赠可拆卸链条，可手拿或斜挎。',
    careInstructions: ['请使用专用皮革护理巾擦拭', '避免接触水和香水', '存放时请填充定型物'],
    features: ['转锁开合', '可拆卸链条', 'Box 小牛皮', '手工边油', '内衬山羊皮'],
    variants: [
      {
        id: '4-black',
        colorName: '经典黑',
        colorHex: '#0A0A0A',
        images: [
          { id: '4-b-1', url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop', alt: 'Miniature Kelly Black Studio', type: 'studio', orderIndex: 0 },
          { id: '4-b-2', url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=1000&fit=crop', alt: 'Miniature Kelly Black Lifestyle', type: 'lifestyle', orderIndex: 1 },
        ],
        price: 38800,
        inventory: 1,
        sku: 'MK-BLK-001',
        isDefault: true,
      },
      {
        id: '4-burgundy',
        colorName: '勃艮第红',
        colorHex: '#6B1C23',
        images: [
          { id: '4-bg-1', url: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&h=1000&fit=crop', alt: 'Miniature Kelly Burgundy Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 38800,
        inventory: 2,
        sku: 'MK-BRG-001',
        isDefault: false,
      },
      {
        id: '4-gold',
        colorName: '香槟金',
        colorHex: '#C5A55A',
        images: [
          { id: '4-g-1', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop', alt: 'Miniature Kelly Gold Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 42800,
        inventory: 1,
        sku: 'MK-GLD-001',
        isDefault: false,
      },
    ],
    tags: ['晚宴', '经典', '迷你'],
    isNew: true,
    isFeatured: true,
    createdAt: '2025-12-01',
  },
  {
    id: '5',
    slug: 'atelier-bucket',
    titleEn: 'Atelier Bucket',
    titleZh: 'Atelier Bucket',
    collection: 'Artisan',
    category: 'bucket',
    material: 'Swift Calfskin',
    size: '24 x 28 x 16 cm',
    weight: '550g',
    moq: 1,
    productionTime: '2-3 weeks',
    customizationAvailable: true,
    status: 'active',
    descriptionEn: 'A bucket bag inspired by the artisan workshop. Swift calfskin offers a beautifully natural drape. The drawstring design is casually elegant, and the spacious interior holds all your daily essentials.',
    descriptionZh: '灵感取自工匠工坊的水桶包，以 Swift 牛皮呈现柔美自然的垂坠感。抽绳开合设计随性优雅，宽敞内里可容纳日常所需。搭配粗细两款肩带，风格随心切换。',
    careInstructions: ['Swift 皮革较为娇嫩，请格外小心', '避免与深色衣物长时间摩擦', '定期使用护理霜保养'],
    features: ['抽绳开合', '双肩带可替换', '内置暗袋', 'Swift 牛皮', '手工上蜡线缝制'],
    variants: [
      {
        id: '5-taupe',
        colorName: '灰褐',
        colorHex: '#8B7D6B',
        images: [
          { id: '5-t-1', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop', alt: 'Atelier Bucket Taupe Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 28800,
        inventory: 4,
        sku: 'AB-TPE-001',
        isDefault: true,
      },
      {
        id: '5-ivory',
        colorName: '象牙白',
        colorHex: '#FFFFF0',
        images: [
          { id: '5-i-1', url: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&h=1000&fit=crop', alt: 'Atelier Bucket Ivory Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 28800,
        inventory: 3,
        sku: 'AB-IVR-001',
        isDefault: false,
      },
      {
        id: '5-olive',
        colorName: '橄榄绿',
        colorHex: '#556B2F',
        images: [
          { id: '5-o-1', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop', alt: 'Atelier Bucket Olive Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 29800,
        inventory: 2,
        sku: 'AB-OLV-001',
        isDefault: false,
      },
    ],
    tags: ['休闲', '日常', '艺术'],
    isNew: false,
    isFeatured: true,
    createdAt: '2025-08-10',
  },
  {
    id: '6',
    slug: 'soiree-minaudiere',
    titleEn: 'Soiree Minaudiere',
    titleZh: 'Soiree Minaudiere',
    collection: 'Evening',
    category: 'clutch',
    material: 'Satin + Metal Frame',
    size: '20 x 10 x 5 cm',
    weight: '320g',
    moq: 2,
    productionTime: '4-5 weeks',
    customizationAvailable: false,
    status: 'active',
    descriptionEn: 'A dazzling evening hard-case bag. Satin wraps a metal frame for a lightweight yet sturdy feel. The refined snap closure and velvet lining exude glamour in every detail.',
    descriptionZh: '璀璨晚宴硬壳包，丝缎包覆金属框架，手感轻盈而坚固。精致的按扣开合与丝绒内衬，每一处细节都散发着华美气息。附赠金属链条，可肩背或手拿。',
    careInstructions: ['请避免接触水和油脂', '存放时请置于专用盒中', '丝缎表面请勿用力擦拭'],
    features: ['按扣开合', '金属链条', '丝绒内衬', '金属框架', '手工贴合'],
    variants: [
      {
        id: '6-champagne',
        colorName: '香槟金',
        colorHex: '#D4AF37',
        images: [
          { id: '6-ch-1', url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop', alt: 'Soiree Minaudiere Champagne Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 18800,
        inventory: 5,
        sku: 'SM-CHP-001',
        isDefault: true,
      },
      {
        id: '6-noir',
        colorName: '丝绸黑',
        colorHex: '#111111',
        images: [
          { id: '6-n-1', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop', alt: 'Soiree Minaudiere Black Studio', type: 'studio', orderIndex: 0 },
        ],
        price: 18800,
        inventory: 3,
        sku: 'SM-BLK-001',
        isDefault: false,
      },
    ],
    tags: ['晚宴', '华丽', '小巧'],
    isNew: true,
    isFeatured: false,
    createdAt: '2025-12-15',
  },
]

// ── Mock Inquiries ──

export const mockInquiries: Inquiry[] = [
  {
    id: 'inq-001',
    productId: '1',
    variantId: '1-black',
    quantity: 5,
    destinationCountry: 'United States',
    customization: false,
    customerEmail: 'alice@example.com',
    status: 'new',
    createdAt: '2026-02-20T10:30:00Z',
  },
  {
    id: 'inq-002',
    productId: '4',
    variantId: '4-burgundy',
    quantity: 10,
    destinationCountry: 'France',
    customization: true,
    customerEmail: 'buyer@luxestore.fr',
    status: 'contacted',
    createdAt: '2026-02-18T14:15:00Z',
  },
  {
    id: 'inq-003',
    productId: '2',
    variantId: '2-rose',
    quantity: 3,
    destinationCountry: 'Japan',
    customization: false,
    customerEmail: 'info@tokyo-select.jp',
    status: 'closed',
    createdAt: '2026-02-10T09:00:00Z',
  },
]

// ── Mock Orders (reserved) ──

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Emily Chen',
    email: 'emily@example.com',
    country: 'China',
    totalAmount: 65600,
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    items: [
      { productId: '1', variantId: '1-black', quantity: 2, unitPrice: 32800, productTitle: 'Maison Tote', colorName: '经典黑' },
    ],
    createdAt: '2026-02-15T08:00:00Z',
  },
  {
    id: 'ORD-002',
    customerName: 'Sophie Martin',
    email: 'sophie@example.fr',
    country: 'France',
    totalAmount: 42800,
    paymentStatus: 'pending',
    orderStatus: 'pending',
    items: [
      { productId: '4', variantId: '4-gold', quantity: 1, unitPrice: 42800, productTitle: 'Miniature Kelly', colorName: '香槟金' },
    ],
    createdAt: '2026-02-25T12:00:00Z',
  },
]

// ── Content ──

export const stories: Story[] = [
  {
    id: '1',
    slug: 'art-of-leather',
    title: '皮革的艺术：从原皮到成品的旅程',
    excerpt: '探寻一块顶级皮革如何经历层层甄选与手工处理，最终成为指尖的温润触感。',
    content: '在位于法国南部的制革工坊中，每一张皮革都要经历超过 30 道工序的精心处理...',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',
    author: 'Maison Editorial',
    date: '2025-11-15',
    category: '工艺',
  },
  {
    id: '2',
    slug: 'spring-palette',
    title: '2026 春季色彩趋势：自然之息',
    excerpt: '从大地色系到莫兰迪色调，新一季的色彩灵感源自大自然最温柔的呼吸。',
    content: '每一季的色彩选择都是一次对自然的致敬...',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    author: 'Maison Editorial',
    date: '2025-12-01',
    category: '趋势',
  },
  {
    id: '3',
    slug: 'craftsman-story',
    title: '匠人手记：三十年的坚守',
    excerpt: '对话品牌首席工匠张师傅，聆听他与皮革相伴三十载的故事。',
    content: '张师傅的双手布满了岁月的痕迹，却依然稳健而灵巧...',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
    author: 'Maison Editorial',
    date: '2025-10-20',
    category: '人物',
  },
]

export const lookbookItems: LookbookItem[] = [
  {
    id: '1',
    title: '都市晨光',
    description: '清晨的城市，一杯咖啡，一只包，开启优雅的一天。',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop',
    productSlugs: ['maison-tote', 'petite-fleur'],
  },
  {
    id: '2',
    title: '午后花园',
    description: '阳光透过枝叶洒落，与挚友共享一段悠然时光。',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop',
    productSlugs: ['petite-fleur', 'atelier-bucket'],
  },
  {
    id: '3',
    title: '夜幕华彩',
    description: '灯火璀璨的晚宴，指尖闪耀的光芒是最好的配饰。',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
    productSlugs: ['miniature-kelly', 'soiree-minaudiere'],
  },
  {
    id: '4',
    title: '周末远行',
    description: '说走就走的旅行，一只好包承载所有期待。',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=1000&fit=crop',
    productSlugs: ['voyage-weekender', 'maison-tote'],
  },
]

// ── Helper Functions ──

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.collection === product.collection || p.category === product.category)
    )
    .slice(0, limit)
}

export function formatPrice(price: number, currency = 'CNY'): string {
  if (currency === 'USD') return `$${(price / 7).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  return `\u00A5${price.toLocaleString('zh-CN')}`
}

export function getProductTitle(product: Product, locale: Locale): string {
  return getLocalizedTitle(product, locale)
}

// Generate WhatsApp inquiry message
export function generateInquiryWhatsApp(opts: {
  productName: string
  color: string
  quantity: number
  country: string
  customization: boolean
}): string {
  const msg = `Hello, I am interested in the following product:

Product: ${opts.productName}
Color: ${opts.color}
Quantity: ${opts.quantity} pcs
Destination: ${opts.country}
Customization: ${opts.customization ? 'Yes' : 'No'}

Could you please confirm:
1. Unit price?
2. MOQ?
3. Production time?
4. Shipping cost?
5. Payment methods?

Thank you.`
  return encodeURIComponent(msg)
}
