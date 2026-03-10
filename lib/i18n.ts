export type Locale = 'en' | 'zh'

export const defaultLocale: Locale = 'zh'

export const locales: Locale[] = ['en', 'zh']

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

// Bilingual dictionary for common UI strings
const dict = {
  en: {
    // Navigation
    'nav.bags': 'Bags',
    'nav.lookbook': 'Lookbook',
    'nav.stories': 'Stories',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    // Hero
    'hero.subtitle': '2026 Spring Collection',
    'hero.title_1': 'In the Name',
    'hero.title_2': 'of Craftsmanship',
    'hero.desc': 'Every piece is a condensation of time and artistry',
    'hero.cta': 'Explore Collection',
    // Sections
    'new.label': 'New Arrivals',
    'new.title': 'Just Arrived',
    'new.viewAll': 'View All',
    'craft.label': 'Craftsmanship',
    'craft.title_1': "Handcraft's",
    'craft.title_2': 'Timeless Promise',
    'craft.desc': 'Each handbag is entirely handmade by experienced artisans, going through dozens of meticulous processes from leather selection and cutting to sewing. We believe true luxury lies in the irreplaceable warmth of handwork.',
    'craft.cta': 'Learn More',
    'material.label': 'Materials',
    'material.title_1': 'Finest Leather',
    'material.title_2': 'From the World',
    'material.desc': 'We source materials from the finest tanneries in France and Italy. Every piece of leather undergoes rigorous selection and inspection to ensure the most exceptional texture and lasting quality.',
    // Product
    'product.specs': 'Specifications',
    'product.features': 'Features',
    'product.care': 'Care Guide',
    'product.color': 'Color',
    'product.quantity': 'Quantity',
    'product.onlyLeft': 'Only {n} left',
    'product.whatsappInquiry': 'WhatsApp Inquiry',
    'product.addToCart': 'Add to Bag',
    'product.relatedTitle': 'You May Also Like',
    'product.notFound': 'Product Not Found',
    'product.notFoundDesc': 'This product may have been discontinued',
    // Quick Inquiry
    'inquiry.title': 'Quick Inquiry',
    'inquiry.quantity': 'Quantity (pcs)',
    'inquiry.country': 'Destination Country',
    'inquiry.customization': 'Need Customization?',
    'inquiry.customYes': 'Yes',
    'inquiry.customNo': 'No',
    'inquiry.email': 'Email',
    'inquiry.submit': 'Send via WhatsApp',
    'inquiry.submitEmail': 'Submit Inquiry',
    // Bags page
    'bags.title': 'All Bags',
    'bags.desc': 'Explore our complete collection, each a masterwork of artistry',
    'bags.items': '{n} items',
    'bags.empty': 'No products found',
    'bags.emptyHint': 'Please adjust your filters',
    // Filters
    'filter.color': 'Color',
    'filter.category': 'Bag Type',
    'filter.material': 'Material',
    'filter.availability': 'Stock',
    'filter.inStock': 'In Stock',
    // Cart
    'cart.title': 'Shopping Bag',
    'cart.empty': 'Your bag is empty',
    'cart.startShopping': 'Start Shopping',
    'cart.subtotal': 'Subtotal',
    'cart.shippingNote': 'Shipping calculated at checkout',
    'cart.checkout': 'Checkout',
    'cart.whatsappOrder': 'WhatsApp Order',
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.shipping_info': 'Shipping Information',
    'checkout.shipping_method': 'Shipping Method',
    'checkout.payment': 'Payment',
    'checkout.summary': 'Order Summary',
    'checkout.submit': 'Place Order',
    'checkout.standard': 'Standard Shipping',
    'checkout.express': 'Express Shipping',
    // Footer
    'footer.shop': 'Shop',
    'footer.brand': 'Brand',
    'footer.help': 'Help',
    'footer.allBags': 'All Bags',
    'footer.aboutUs': 'About Us',
    'footer.stories': 'Brand Stories',
    'footer.contactUs': 'Contact Us',
    'footer.faq': 'FAQ',
    'footer.policies': 'Policies',
    'footer.whatsapp': 'WhatsApp',
    'footer.tagline_1': 'With impeccable craftsmanship',
    'footer.tagline_2': 'and the finest materials,',
    'footer.tagline_3': 'presenting extraordinary beauty.',
    'footer.service.shipping': 'Global Shipping',
    'footer.service.shipping_desc': 'Carefully packaged delivery',
    'footer.service.authentic': 'Authenticity Guaranteed',
    'footer.service.authentic_desc': 'Certificate included with each piece',
    'footer.service.consultant': 'WhatsApp Consultant',
    'footer.service.consultant_desc': 'One-on-one shopping service',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    // Search
    'search.placeholder': 'Search...',
    // Admin
    'admin.title': 'Admin Dashboard',
  },
  zh: {
    // Navigation
    'nav.bags': '手袋',
    'nav.lookbook': 'Lookbook',
    'nav.stories': '故事',
    'nav.about': '关于',
    'nav.contact': '联系',
    // Hero
    'hero.subtitle': '2026 春季系列',
    'hero.title_1': '以手工艺之名',
    'hero.title_2': '致敬永恒之美',
    'hero.desc': '每一件作品，都是时间与匠心的凝结',
    'hero.cta': '探索系列',
    // Sections
    'new.label': 'New Arrivals',
    'new.title': '新品上市',
    'new.viewAll': '查看全部',
    'craft.label': 'Craftsmanship',
    'craft.title_1': '手工艺的',
    'craft.title_2': '永恒承诺',
    'craft.desc': '每一只手袋都由经验丰富的工匠全手工制作，从选皮、裁剪到缝合，历经数十道精细工序。我们坚信，真正的奢华在于不可复制的手工温度。',
    'craft.cta': '了解更多',
    'material.label': 'Materials',
    'material.title_1': '甄选全球',
    'material.title_2': '顶级皮革',
    'material.desc': '我们从法国、意大利的顶级制革工坊中精选原料，每一张皮革都经过严格的筛选与鉴定，确保呈现最卓越的质感与经久耐用的品质。',
    // Product
    'product.specs': '规格详情',
    'product.features': '产品特点',
    'product.care': '保养指南',
    'product.color': '颜色',
    'product.quantity': '数量',
    'product.onlyLeft': '仅剩 {n} 件',
    'product.whatsappInquiry': 'WhatsApp 询价',
    'product.addToCart': '加入购物袋',
    'product.relatedTitle': '你可能也喜欢',
    'product.notFound': '商品未找到',
    'product.notFoundDesc': '该商品可能已下架',
    // Quick Inquiry
    'inquiry.title': '快速询价',
    'inquiry.quantity': '数量 (件)',
    'inquiry.country': '目的国家',
    'inquiry.customization': '需要定制?',
    'inquiry.customYes': '是',
    'inquiry.customNo': '否',
    'inquiry.email': '邮箱',
    'inquiry.submit': '通过 WhatsApp 发送',
    'inquiry.submitEmail': '提交询价',
    // Bags page
    'bags.title': '全部手袋',
    'bags.desc': '探索我们的完整系列，每一件都是匠心之作',
    'bags.items': '{n} 件商品',
    'bags.empty': '未找到商品',
    'bags.emptyHint': '请尝试调整筛选条件',
    // Filters
    'filter.color': '颜色',
    'filter.category': '包型',
    'filter.material': '材质',
    'filter.availability': '库存',
    'filter.inStock': '现货',
    // Cart
    'cart.title': '购物袋',
    'cart.empty': '您的购物袋是空的',
    'cart.startShopping': '开始选购',
    'cart.subtotal': '小计',
    'cart.shippingNote': '配送费用将在结账时计算',
    'cart.checkout': '结账',
    'cart.whatsappOrder': 'WhatsApp 下单',
    // Checkout
    'checkout.title': '结账',
    'checkout.shipping_info': '收货信息',
    'checkout.shipping_method': '配送方式',
    'checkout.payment': '支付方式',
    'checkout.summary': '订单摘要',
    'checkout.submit': '提交订单',
    'checkout.standard': '标准配送',
    'checkout.express': '加急配送',
    // Footer
    'footer.shop': '购物',
    'footer.brand': '品牌',
    'footer.help': '帮助',
    'footer.allBags': '全部手袋',
    'footer.aboutUs': '关于我们',
    'footer.stories': '品牌故事',
    'footer.contactUs': '联系我们',
    'footer.faq': '常见问题',
    'footer.policies': '退换政策',
    'footer.whatsapp': 'WhatsApp 联系',
    'footer.tagline_1': '以精湛手工艺与极致选材，',
    'footer.tagline_2': '呈现非凡之美。',
    'footer.tagline_3': '',
    'footer.service.shipping': '全球配送',
    'footer.service.shipping_desc': '精心包装',
    'footer.service.authentic': '精品保证',
    'footer.service.authentic_desc': '每件作品质量保证',
    'footer.service.consultant': 'WhatsApp 专属顾问',
    'footer.service.consultant_desc': '一对一选购服务',
    'footer.privacy': '隐私政策',
    'footer.terms': '使用条款',
    // Search
    'search.placeholder': '搜索...',
    // Admin
    'admin.title': '管理后台',
  },
} as const

export type DictKey = keyof typeof dict.en

export function t(locale: Locale, key: DictKey, params?: Record<string, string | number>): string {
  const val = dict[locale]?.[key] || dict.en[key] || key
  if (!params) return val
  return Object.entries(params).reduce(
    (str, [k, v]) => str.replace(`{${k}}`, String(v)),
    val
  )
}

export function getLocalePath(locale: Locale, path: string): string {
  return `/${locale}${path}`
}
