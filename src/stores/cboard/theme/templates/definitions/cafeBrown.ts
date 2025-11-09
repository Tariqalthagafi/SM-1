import type { TemplateConfig } from '@/types/contexts/templates'


export const cafeBrown: TemplateConfig = {
  id: 'cafe-brown',
  name: 'كافيه بني',
  layout: 'cafe',

  css: `
    .menu {
      background-color: var(--menu-bg);
      font-family: var(--font-family), serif;
      color: var(--text-color, #4e342e);
      padding: 1rem;
      max-width: 900px;
      margin: auto;
    }

    .menu .section {
      margin-bottom: 2rem;
    }

    .menu .section-title {
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: var(--sectionTitle-color, #3e2723);
      border-bottom: 2px solid var(--section-border, #a1887f);
      padding-bottom: 0.4rem;
    }

    .menu .product {
      display: flex;
      align-items: center;
      background-color: var(--product-bg);
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      margin-bottom: 1rem;
      overflow: hidden;
      transition: transform 0.2s ease;
    }

    .menu .product:hover {
      transform: translateY(-2px);
    }

    .menu .product img {
      object-fit: cover;
      flex-shrink: 0;
    }

    .image-circle img { border-radius: 50%; width: 80px; height: 80px; }
    .image-square img { border-radius: 0; width: 90px; height: 90px; }
    .image-rectangle img { border-radius: 6px; width: 120px; height: 80px; }
    .image-none img { display: none; }

    .menu .product-info {
      flex: 1;
      padding: 0.6rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .menu .product-name {
      font-weight: bold;
      color: var(--productName-color, #4e342e);
      font-size: 1rem;
    }

    .menu .price {
      color: var(--price-color, #6d4c41);
      font-weight: bold;
      margin-top: 0.3rem;
      font-size: 0.95rem;
    }

    .menu .offer {
      background-color: var(--offer-bg, #d7ccc8);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      margin-top: 0.3rem;
      display: inline-block;
    }

    .menu .expired {
      text-decoration: line-through;
      opacity: 0.6;
    }

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

    /* 📱 تحسين العرض على الجوال */
    @media (max-width: 600px) {
      .menu {
        padding: 0.5rem;
      }
      .menu .product {
        flex-direction: column;
        align-items: flex-start;
      }
      .menu .product img {
        width: 100%;
        height: auto;
      }
      .menu .product-info {
        padding: 0.8rem;
      }
      .menu .product-name {
        font-size: 1.1rem;
      }
      .menu .price {
        font-size: 1rem;
      }
    }
  `,

  defaultSettings: {
    colors: {
      menu: '#efebe9',
      section: '#d7ccc8',
      product: '#ffffff',
      sectionTitle: '#3e2723',
      productName: '#4e342e',
      price: '#6d4c41',
      offer: '#d7ccc8'
    },
    fontFamily: 'Cairo',
    offerStyle: 'strikeOnly',
    expiredStyle: 'strike',
    imageShape: 'rectangle',
    allergens: [],
    allergenIconStyle: 'colored',
    allergenIconColor: '#ff0000'
  },

  allowedCustomizations: {
    backgroundColors: ['menu', 'section', 'product'],
    textColors: ['sectionTitle', 'productName', 'price'],
    font: true,
    offerStyles: [ 'strikeOnly'],
    expiredStyles: ['strike', 'badge'],
    imageShapes: ['circle', 'roundedSquare', 'rectangle', 'hidden'],
allergenIconStyles: ['colored', 'outlined', 'monochrome'],
    allergenIconColor: '#ff0000'
  }
}
