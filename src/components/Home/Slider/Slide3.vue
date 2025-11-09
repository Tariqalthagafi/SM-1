<template>
  <div class="slide">
    <h2>تجربة سلسة على كل الأجهزة</h2>
    <p>
      منيو يظهر بشكل مثالي على الجوال، التابلت، والشاشات الكبيرة بدون أي تعديل إضافي.  
      التصميم يستجيب تلقائيًا ويعرض المحتوى بأفضل شكل ممكن.
    </p>
    <button class="cta">ابدأ الآن</button>
  </div>
</template>

<style scoped>
.slide {
  text-align: center;
  padding: 2rem;
  background-color: #F9F5F0;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

h2 {
  color: #FF7A00; /* برتقالي */
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

p {
  color: #1C1C1C; /* أسود ناعم */
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.cta {
  background-color: #FF7A00;
  color: #fff;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta:hover {
  background-color: #e96b00;
}
</style>
