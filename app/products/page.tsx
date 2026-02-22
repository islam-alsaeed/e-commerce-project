"use client";
import React, { useEffect, useState } from 'react'
import "../styles/tables.css"


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

function page() {
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
        <div>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Image</th>
                </thead>
                <tbody>
                    {products.map((product)=>(
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>{product.rating?.rate} ({product.rating?.count} reviews)</td>
                        <td><img src={product.image} alt={product.title} width="100" /></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default page;