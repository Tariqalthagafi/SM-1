import type { TemplateConfig } from '@/types/contexts/templates'

export const minimalBlack: TemplateConfig = {
  id: 'minimal-black',
  name: 'مينيمال أسود',
  layout: 'minimal',

  css: `
    .menu {
      background-color: var(--menu-bg);
      font-family: var(--font-family), sans-serif;
      color: var(--text-color, #ffffff);
    }
    .menu .section {
      background-color: var(--section-bg);
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .menu .section-title {
      color: var(--sectionTitle-color, #ffffff);
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .menu .product {
      background-color: var(--product-bg);
      border-bottom: 1px solid #444;
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .menu .product img { object-fit: cover; }
    .image-circle img { border-radius: 50%; }
    .image-square img { border-radius: 0; }
    .image-rectangle img { border-radius: 6px; width: 120px; height: 80px; }
    .image-none img { display: none; }

    .menu .product-name { font-weight: bold; color: var(--productName-color, inherit); }
    .menu .price { color: var(--price-color, #ffeb3b); font-weight: bold; }
    .menu .offer { background-color: var(--offer-bg, #ff9800); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85rem; }
    .menu .expired { text-decoration: line-through; opacity: 0.6; }

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
      menu: '#000000',
      section: '#1c1c1c',
      product: '#121212',
      sectionTitle: '#ffffff',
      productName: '#ffffff',
      price: '#ffeb3b',
      offer: '#ff9800'
    },
    fontFamily: 'Roboto',
    offerStyle: 'badgeWithNewPrice',
    expiredStyle: 'strike',
    imageShape: 'roundedSquare',
    allergens: [],
    allergenIconStyle: 'colored',
    allergenIconColor: '#ff0000'
  },

  allowedCustomizations: {
    backgroundColors: ['menu', 'section', 'product'],
    textColors: ['sectionTitle', 'productName', 'price'],
    font: true,
    offerStyles: ['badgeWithNewPrice'],
    expiredStyles: ['strike', 'badge'],
    imageShapes: ['circle', 'roundedSquare', 'rectangle', 'none'],
    allergenIconStyles: ['colored', 'outlined', 'monochrome'],
    allergenIconColor: '#ff0000'
  }
}
