/* Note: these are product IDs that are in my Stripe dashboard, 
  you'll need to replace them with products you create on your own dashboard  */
  
export const products = [
  {
    id: "price_1NUL3OBAPlcBoDEX9eBw8WFH",
    name: "Zoppen Passport Holder / Wallet, Navy Blue",
    price: 899, //$8.99
    emoji: "👛",
    currency: "USD",
    image: "/Zoppen.jpg",
  },
  {
    id: "price_1NUKwBBAPlcBoDEXdvLOlnIz",
    name: "Horizon Zero Dawn: Complete Edition (Used)",
    price: 1499, //$14.99
    emoji: "🎮",
    currency: "USD",
    image: "/HorizonZeroDawn.jpg",
  },
  {
    id: "price_1NUKeyBAPlcBoDEXHylTqXY4",
    name: "Effective Java, 3rd Edition (Used)",
    /* Prices are in smallest currency unit, 105 pence = £1.05 */
    price: 3500, //$35.00
    emoji: "📚",
    currency: "USD",
    image: "/EffectiveJava.jpg",
  },
];
