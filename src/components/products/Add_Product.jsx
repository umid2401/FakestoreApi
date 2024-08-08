// components/AddProductForm.js
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [products, setProducts] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const get_data = async () => {
    try {
      const response = await fetch(`${api_url}/products`);
      const data = await response?.json();
      setProducts(data)
    } catch (error) {
      toast.error("Error")    }
  };
  const post_data = async () =>{
    try {
        const response = await fetch(`${api_url}/products`,{
            method:"POST",
            headers:{
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify(product),
        
            });
        if(response.ok){
                setProduct({
                    title: '',
                    price: '',
                    category: '',
                    description: '',
                    image: ''
                  });
                  toast.success("Added Product")
            };
            get_data()
    } catch (error) {
        alert(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await post_data();
  
  };
 useEffect(()=>{
    get_data();
 },[])
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
        
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          placeholder="Enter product title"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          placeholder="Enter product price"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          placeholder="Enter product category"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          placeholder="Enter product description"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="url"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          placeholder="Enter product image URL"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
