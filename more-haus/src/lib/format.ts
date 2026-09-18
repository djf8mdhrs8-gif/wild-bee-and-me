/** "$2,400" — whole dollars, because nothing here is priced in cents. */
export function formatPrice(price: number | null): string {
  if (price === null) return "Price on request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
