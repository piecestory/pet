"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export interface ProductCardData {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  tone?: "" | "ph-2" | "ph-3";
  badge?: string;
}

export default function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="card" style={{ overflow: "hidden", position: "relative" }}>
      <div className={`ph ${product.tone || ""}`} style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
        {product.badge && <span className="rare-badge">{product.badge}</span>}
        <Link href={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </Link>
        <button
          aria-label="إضافة للمفضلة"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "var(--surface)",
            borderRadius: "50%",
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--border)",
            zIndex: 2
          }}
        >
          <Heart size={16} color="var(--primary)" />
        </button>
        <button
          aria-label="إضافة للسلة"
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            background: "var(--gold)",
            borderRadius: "50%",
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            zIndex: 2
          }}
        >
          <ShoppingBag size={16} color="var(--surface)" />
        </button>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <Link href={`/product/${product.slug}`}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{product.title}</h3>
        </Link>
        <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 15 }}>
          SAR {product.price.toLocaleString("en-US")}
        </span>
      </div>
    </div>
  );
}
