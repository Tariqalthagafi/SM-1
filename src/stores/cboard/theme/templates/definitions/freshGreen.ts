import type { TemplateConfig } from '@/types/contexts/templates'

export const freshGreen: TemplateConfig = {
  id: 'fresh-green',
  name: 'فريش أخضر',
  layout: 'fresh',

  css: `
    .menu {
      background-color: var(--menu-bg);
      font-family: var(--font-family), sans-serif;
      color: var(--text-color, #1b5e20);
      padding: 1rem;
    }
    .menu .section {
      margin-bottom: 1.5rem;
    }
    .menu .section-title {
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 0.8rem;
      color: var(--sectionTitle-color, #2e7d32);
      border-bottom: 2px solid var(--section-border, #a5d6a7);
      padding-bottom: 0.3rem;
    }
    .menu .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1rem;
    }
    .menu .product {
      background-color: var(--product-bg);
      padding: 1rem;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
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
      color: var(--productName-color, #1b5e20);
    }
    .menu .price {
      color: var(--price-color, #2e7d32);
      font-weight: bold;
      margin-top: 0.3rem;
    }
    .menu .offer {
      background-color: var(--offer-bg, #81c784);
      padding: 0.2rem 0.5rem;
      border-radius: 12px;
      font-size: 0.85rem;
      margin-top: 0.3rem;
      display: inline-block;
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
      menu: '#e8f5e9',
      section: '#c8e6c9',
      product: '#ffffff',
      sectionTitle: '#2e7d32',
      productName: '#1b5e20',
      price: '#2e7d32',
      offer: '#81c784'
    },
    fontFamily: 'Tajawal',
    offerStyle: 'strikeOnly',
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
    offerStyles: ['strikeOnly'],
    expiredStyles: ['strike', 'badge'],
    imageShapes: ['circle', 'roundedSquare', 'rectangle', 'hidden'],
    allergenIconStyles: ['colored', 'outlined', 'monochrome'],
    allergenIconColor: '#ff0000'
  }
}