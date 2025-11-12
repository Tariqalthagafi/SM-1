<template>
  <div class="slide">
    <h2 class="headline">
      <span class="highlight">منيو تفاعلي</span> يعكس هوية مطعمك
    </h2>
    <div class="content-row">
      <img src="/images/slide_2.jpg" alt="Interactive Menu" class="slide-image" />
      <p class="subtext">
        ارتقِ بتجربة عملائك عبر منيو ذكي يُعرض بانسيابية على كل شاشة.
      </p>
    </div>
  </div>
</template>

<style scoped>
.slide {
  text-align: center;
  padding: 2rem 1rem;
  background-color: transparent;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Tajawal', sans-serif;
}

/* ✅ العنوان */
.headline {
  font-size: 2rem;
  color: #1C1C1C;
  margin-bottom: 2rem;
}

.highlight {
  color: #FF7A00;
  font-weight: bold;
}

/* ✅ صف المحتوى */
.content-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

/* ✅ الصورة */
.slide-image {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* ✅ النص */
.subtext {
  font-size: 1.2rem;
  color: #1C1C1C;
  text-align: start;
  max-width: 400px;
}
</style>
