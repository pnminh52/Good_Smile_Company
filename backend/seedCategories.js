import axios from "axios";

const API_URL = "http://localhost:3000/api/categories"; // đổi port nếu khác

const categories = [
  {
    name: "iPhone",
    image:
      "https://www.apple.com/v/iphone/home/aa/images/meta/iphone__ky2k6x5u6vue_og.png",
    description: "Explore the latest iPhone models with advanced features.",
  },
  {
    name: "Mac",
    image:
      "https://www.apple.com/v/mac/home/bs/images/meta/mac__bq9v4v3iy6ya_og.png",
    description: "MacBook Air, MacBook Pro, iMac, Mac mini and more.",
  },
  {
    name: "iPad",
    image:
      "https://www.apple.com/v/ipad/home/cc/images/meta/ipad__fioegapg12qi_og.png",
    description: "Powerful and versatile iPads for work and play.",
  },
  {
    name: "Apple Watch",
    image:
      "https://www.apple.com/v/watch/home/aw/images/meta/watch__f8vsmczcntea_og.png",
    description: "Track your health and fitness with Apple Watch.",
  },
  {
    name: "AirPods",
    image:
      "https://www.apple.com/v/airpods/home/ab/images/meta/airpods__eb3dj2k11xyu_og.png",
    description: "Wireless AirPods with high-quality sound.",
  },
  {
    name: "Accessories",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/accessories-OG-2023?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1688071598505",
    description: "Explore Apple-designed cases, cables, and more.",
  },
  {
    name: "Apple TV & Home",
    image:
      "https://www.apple.com/v/apple-tv-home/b/images/meta/apple_tv__f9l0f9xsnmaa_og.png",
    description: "Apple TV 4K and HomePod mini for entertainment at home.",
  },
];

async function seedCategories() {
  try {
    for (const cat of categories) {
      const res = await axios.post(API_URL, cat);
      console.log(`✅ Added: ${res.data.name}`);
    }
    console.log("🎉 Categories seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding categories:", error.response?.data || error.message);
  }
}

seedCategories();
