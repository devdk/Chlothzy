// app/routes/product-detail.tsx
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  // Later: fetch real product by ID
  return (
    <div>
      <h1 className="text-2xl font-bold">Product ID: {id}</h1>
      <p>Product details coming soon...</p>
    </div>
  );
}
