// All copy and facts mirror fuchkawala.com — change content here, not in components.

export const site = {
  name: "Fuchkawala",
  url: "https://fuchkawala.com",
  tagline: "বিদেশী রং দেশি ঢং",
  phone: "610-835-3074",
  phoneHref: "tel:+16108353074",
  whatsapp: "https://wa.me/16108353074",
  email: "fuchkawalallc@gmail.com",
  address: {
    street: "303 S 69th St",
    city: "Upper Darby Township",
    region: "PA",
    zip: "19082",
    country: "US",
  },
  geo: { lat: 39.955002, lng: -75.2580926 },
  hours: "7 days a week · 12 PM – 10 PM",
  mapsUrl:
    "https://www.google.com/maps/place/Fuchkawala/@39.955002,-75.2580926,17z",
  mapsEmbed:
    "https://maps.google.com/maps?q=Fuchkawala%2C%20303%20S%2069th%20St%2C%20Upper%20Darby%20Township%2C%20PA%2019082&t=m&z=15&output=embed&iwloc=near",
  facebook: "https://www.facebook.com/profile.php?id=61586861108733",
  instagram: "https://www.instagram.com/fuchkawalaupperdarby",
  rating: 4.8,
  reviewCount: 39,
};

export type Dish = {
  name: string;
  price: number;
  desc: string;
  img: string;
  tags?: ("Popular" | "Veg" | "Spicy")[];
};

export const streetFood: Dish[] = [
  { name: "Tamarind Fuchka", price: 7.99, img: "/img/tamarind-fuchka.webp", tags: ["Popular", "Veg"], desc: "Crispy puris stuffed with spiced potatoes, chickpeas, onions, herbs, tamarind and mint water." },
  { name: "Doi Fuchka", price: 8.99, img: "/img/doi-fuchka-yogurt-fuchka.webp", tags: ["Veg"], desc: "Fuchka filled with yogurt, chickpeas, potatoes, onions, tamarind chutney, roasted cumin, black salt, sev." },
  { name: "Fuchka Shots · 6", price: 8.99, img: "/img/fuchka-shots.webp", desc: "Six fuchkas served with tamarind, mint, chili, jaggery, and lime-spiced waters." },
  { name: "Chotpoti", price: 8.99, img: "/img/chotpoti-top-view.webp", desc: "Yellow peas, potatoes, onions, chilies, cilantro, tamarind, spices, crushed fuchka with grated egg." },
  { name: "Haleem", price: 9.99, img: "/img/haleem.webp", tags: ["Popular"], desc: "Slow-cooked wheat, lentil, and meat stew with aromatic spices, cilantro, lemon, and chilies." },
  { name: "Jhal Muri", price: 5.99, img: "/img/jhal-muri.webp", tags: ["Popular"], desc: "Puffed rice mixed with boiled potatoes, onions, green chilies, chickpeas, coriander, and spice blend." },
  { name: "Kolija Jhal Muri", price: 6.99, img: "/img/kolija-jhalmuri.webp", tags: ["Spicy"], desc: "A spicier jhal muri topped with fried beef liver curry, chopped onions, and green chilies." },
  { name: "Fire Chanachur", price: 6.99, img: "/img/fire-chanachur.webp", tags: ["Spicy"], desc: "Extra spicy puffed rice, fried lentils, peanuts, sev, onions, green chilies, lime juice, and dry red chili." },
  { name: "Mango Chat", price: 6.99, img: "/img/mango-chat.webp", desc: "Chopped raw mango mixed with chat masala and sugar, salt, red chili, lemon juice." },
  { name: "Guava Chat", price: 6.99, img: "/img/guava-chat.webp", desc: "Chopped guava tossed with chili powder, black salt, sugar, lime juice." },
];

export const beverages: Dish[] = [
  { name: "Lassi", price: 4.99, img: "/img/lassi.webp", tags: ["Popular"], desc: "Traditional yogurt drink blended with sugar, cardamom, and your choice of flavor." },
  { name: "Chaa", price: 1.99, img: "/img/milk-chaa.webp", tags: ["Popular"], desc: "Bangladeshi-style milk tea made with black tea, milk, sugar, and cardamom. Ginger if you like." },
  { name: "Mohabbat Ka Sharbat", price: 5.99, img: "/img/mohabbat-ka-sharbat.webp", desc: "Chilled milk blended with rose syrup, watermelon chunks, and dry fruits." },
  { name: "Glass Soda", price: 2.49, img: "/img/glass-bottle-coca-cola.webp", desc: "Glass-bottled soda served chilled with crisp fizz and classic flavor." },
  { name: "Can Soda", price: 1.49, img: "/img/can-soda.webp", desc: "Canned soda served chilled, the perfect fizzy complement to your meal." },
  { name: "Water", price: 1.49, img: "/img/water-bottle.webp", desc: "Pure bottled mineral water, served chilled with every meal." },
];

export const features = [
  { title: "Handmade crispy shells", text: "Perfectly crunchy shells prepared for the ultimate bite, every single time." },
  { title: "Signature spice blend", text: "A carefully crafted mix of spices that creates a bold and unforgettable flavor." },
  { title: "Customizable heat", text: "Mild, medium, or extra hot. We make it exactly how you like it." },
  { title: "Fresh tamarind water", text: "Tangy, refreshing and packed with authentic street food taste." },
  { title: "Hygienic preparation", text: "Prepared with care using fresh ingredients and hygienic practices." },
  { title: "Authentic street taste", text: "The flavor and excitement of South Asian street food, brought to Philadelphia." },
];

export const reviews: { name: string; text: string; lang?: string }[] = [
  { name: "Sabrina Mostaqima", text: "Just loved it. Came, ordered whatever I wanted and I was happy. The environment they created goes with their food. In Philly, they serve the best fuchka and Haleem, I can say that for sure." },
  { name: "Fahmid Chowdhury", text: "Staff who work here actually know customer service. We tried beef Haleem, jhalmuri and fuchka — we found the actual Bangladeshi flavour in all of them. The songs they played were great as well." },
  { name: "Saad Alam", text: "Amazing food, amazing service. Definitely worth coming." },
  { name: "Ifty No", text: "খাবারটা ছিল অসাধারণ; শুধু দেখেই আমার খিদে পেয়ে গিয়েছিল। মাশাআল্লাহ, তারা এখানে দারুণ কাজ করছে।", lang: "bn" },
  { name: "Hasiba Khushbu", text: "The place overall was great! Jhaal moori was excellent, and the kolija shingara was also good." },
];

export const faqs = [
  { q: "What exactly is fuchka?", a: "Fuchka (also called pani puri or golgappa) is a beloved South Asian street food — small crispy hollow shells filled with a spiced potato and chickpea mixture, served with tangy tamarind water. It's one of the most loved street snacks in Bangladesh and India." },
  { q: "Is your fuchka halal?", a: "Yes, 100%. All our ingredients and preparation methods follow halal guidelines." },
  { q: "Do you offer delivery?", a: "Currently we offer pickup only. Place your order online or via WhatsApp and pick up at our location." },
  { q: "How spicy is the fuchka?", a: "You choose your spice level — mild, medium, or extra hot. Just let us know when you order." },
  { q: "Do you cater for events and parties?", a: "Absolutely. We love doing events, Eid gatherings, birthdays, and corporate events. Contact us for a custom quote." },
  { q: "Are there vegetarian options?", a: "Yes. Our Classic and Doi Fuchka are fully vegetarian — perfect for plant-based eaters." },
];

export const nav = [
  { label: "Menu", href: "#menu" },
  { label: "Process", href: "#process" },
  { label: "Story", href: "#story" },
  { label: "Reviews", href: "#reviews" },
  { label: "Offer", href: "#offer" },
  { label: "Visit", href: "#visit" },
  { label: "FAQ", href: "#faq" },
];
