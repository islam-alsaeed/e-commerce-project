"use client";
import React, { useEffect, useState } from 'react'
import "../styles/products.css"
import Link from 'next/link';


type Products = {

    id: number;
    title: string;
    price: number;
    decription: string;
    image: string;
    category?: string;
    rating?: {
        rate: number;
        count: number;
    }

}

function Page() {
    const [products, setProducts] = useState<Products[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);
    return (
        <div className="products-container">
            {
                products.map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id} className='product-link'>
                    <div className='prduct-card' key={product.id}>
                        <img src={product.image} alt={product.title} className='product-image' />
                        <h3 className='product-title'>{product.title}</h3>
                        <p className='category'>{product.category}</p>

                        <div className='price-and-rating'>
                            <span className="price">${product.price}</span>
                            {product.rating && (
                                <span className="rating">
                                    {"⭐".repeat(Math.round(product.rating.rate))}
                                </span>)}

                        </div>
                    </div>
                    </Link>
                ))
            }
        </div>
    );
}

export default Page;