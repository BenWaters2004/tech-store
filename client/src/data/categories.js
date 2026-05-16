import { Headphones, Laptop, Package, Smartphone, Watch } from "lucide-react";

export const categories = [
  { name: "Smartphones", icon: Smartphone },
  { name: "Laptops", icon: Laptop },
  { name: "Audio", icon: Headphones },
  { name: "Wearables", icon: Watch },
  { name: "Accessories", icon: Package },
];

export const emptyProduct = {
  name: "",
  brand: "",
  category: "Smartphones",
  description: "",
  price: "",
  compare_at_price: "",
  stock: "",
  image_url: "",
  featured: true,
};
