import type { TemplateConfig } from '@/types/contexts/templates'

export const classicGold: TemplateConfig = {
  id: 'classic-gold',
  name: 'كلاسيك ذهبي',
  layout: 'classic',

  css: `
    .menu {
      background-color: var(--menu-bg);
      font-family: var(--font-family), sans-serif;
      color: var(--text-color, #4e342e);
      padding: 1rem;
      max-width: 1000px;
      margin: auto;
    }

    .menu .section {
      margin-bottom: 2rem;
    }

    .menu .section-title {
      color: var(--sectionTitle-color, #4e342e);
      font-weight: bold;
      font-size: 1.6rem;
      margin-bottom: 1rem;
      text-align: center;
      position: relative;
    }
    .menu .section-title::after {
      content: "";
      display: block;
      width: 60px;
      height: 3px;
      background-color: var(--price-color, #bf360c);
      margin: 0.5rem auto 0;
      border-radius: 2px;
    }

    /* شبكة المنتجات */
    .menu .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1rem;
    }

    .menu .product {
      background-color: var(--product-bg);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease;
    }
    .menu .product:hover {
      transform: translateY(-3px);
    }

    .menu .product img {
      object-fit: cover;
      width: 100%;
      height: 150px;
    }

    /* أشكال الصور */
    .image-circle img { border-radius: 50%; width: 120px; height: 120px; margin: 1rem auto 0; }
    .image-square img { border-radius: 0; }
    .image-rectangle img { border-radius: 0; width: 100%; height: 150px; }
    .image-none img { display: none; }

    .menu .product-info {
      padding: 0.8rem 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .menu .product-name {
      font-weight: bold;
      color: var(--productName-color, inherit);
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .menu .price {
      color: var(--price-color, #bf360c);
      font-weight: bold;
      font-size: 1rem;
      text-align: center;
    }

    .menu .offer {
      background-color: var(--offer-bg, #ffd54f);
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.85rem;
      text-align: center;
      margin-top: 0.5rem;
    }

    .menu .expired {
      text-decoration: line-through;
      opacity: 0.6;
    }

    /* رمز الحساسية */
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
      .menu .section-title {
        font-size: 1.4rem;
      }
      .menu .product img {
        height: 140px;
      }
    }
  `,

  defaultSettings: {
    colors: {
      menu: '#fff8e1',
      section: '#fff3cd',
      product: '#ffffff',
      sectionTitle: '#4e342e',
      productName: '#4e342e',
      price: '#bf360c',
      offer: '#ffd54f'
    },
    fontFamily: 'Cairo',
    offerStyle: 'badgeWithNewPrice',
    expiredStyle: 'strike',
    imageShape: 'rectangle',
    allergens: [],
    allergenIconStyle: 'colored',
    allergenIconColor: '#ff0000'
  },

  allowedCustomizations: {
    backgroundColors: ['menu', 'section', 'product'],
    textColors: ['sectionTitle','productName', 'price'],
    font: true,
    offerStyles: [ 'badgeWithNewPrice'],
    expiredStyles: ['strike', 'badge'],
    imageShapes: ['circle', 'roundedSquare', 'rectangle', 'none'],
    allergenIconStyles: ['colored', 'outlined', 'monochrome'],
    allergenIconColor: '#ff0000'
  }
}
