"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function ProductDetails({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${params.id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [params.id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <button
                onClick={() => router.back()}
                style={{
                    padding: "8px 14px",
                    background: "#eee",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    marginBottom: "20px"
                }}
            >
                ← Back
            </button>
            <img
                src={product.image}
                alt={product.title}
                style={{ width: "250px", objectFit: "contain" }}
            />

            <h1>{product.title}</h1>
            <p>{product.category}</p>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>${product.price}</p>

            <p>
                {"⭐".repeat(Math.round(product.rating.rate))}
                <span style={{ marginLeft: "8px" }}>
                    ({product.rating.count} reviews)
                </span>
            </p>

            <p>{product.description}</p>
        </div>
    );
}