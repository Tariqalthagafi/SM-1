import type { TemplateConfig } from '@/types/contexts/templates'

export const modernBlue: TemplateConfig = {
  id: 'modern-blue',
  name: 'مودرن أزرق',
  layout: 'modern',

  css: `
    .menu {
      background-color: var(--menu-bg);
      font-family: var(--font-family), sans-serif;
      color: var(--text-color, #0d47a1);
    }
    .menu .section {
      background-color: var(--section-bg);
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1rem;
    }
    .menu .section-title {
      color: var(--sectionTitle-color, #0d47a1);
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .menu .product {
      background-color: var(--product-bg);
      border-bottom: 1px solid #bbdefb;
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .menu .product img {
      object-fit: cover;
    }
    /* أشكال الصور */
    .image-circle img { border-radius: 50%; }
    .image-square img { border-radius: 0; }
    .image-rectangle img { border-radius: 6px; width: 120px; height: 80px; }
    .image-none img { display: none; }

    .menu .product-name {
      font-weight: bold;
      color: var(--productName-color, inherit);
    }
    .menu .price {
      color: var(--price-color, #1565c0);
      font-weight: bold;
    }
    .menu .offer {
      background-color: var(--offer-bg, #64b5f6);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.85rem;
    }
    .menu .expired {
      text-decoration: line-through;
      opacity: 0.6;
    }

    /* رمز الحساسية 🅰 */
    .allergen-icon {
      color: var(--allergen-icon-color, red);
      font-size: 1rem;
      margin-left: 0.3rem;
      animation: flash 1.2s infinite;
      cursor: pointer;
    }
    @keyframes flash {
      0%, 100% { opacity: 1; text-shadow: 0 0 5px currentColor; }
      50% { opacity: 0.6; text-shadow: 0 0 15px currentColor; }
    }
  `,

  defaultSettings: {
    colors: {
      menu: '#e3f2fd',
      section: '#bbdefb',
      product: '#ffffff',
      sectionTitle: '#0d47a1',
      productName: '#0d47a1',
      price: '#1565c0',
      offer: '#64b5f6'
    },
    fontFamily: 'Tajawal',
    offerStyle: 'badge',
    expiredStyle: 'strike',
    imageShape: 'circle',
    allergens: [],
    allergenIconStyle: 'colored',
    allergenIconColor: '#ff0000'
  },

  allowedCustomizations: {
    backgroundColors: ['menu', 'section', 'product'],
    textColors: ['sectionTitle', 'productName', 'price'],
    font: true,
    offerStyles: ['priceOnly', 'badge'],
    expiredStyles: ['strike', 'badge'],
    imageShapes: ['circle', 'square', 'rectangle', 'none'],
    allergenIconStyles: ['colored', 'outline', 'flat'],
    allergenIconColor: '#ff0000'
  }
}
