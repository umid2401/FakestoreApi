import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Products() {
    const [data, setData] = useState();
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    useEffect(()=>{
        get_data();
      },[])
    const get_data = async () => {
        try {
          const response = await fetch(`${api_url}/products`);
          const data = await response?.json();
          setData(data)
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
    const remove_data = async (id) =>{
        try {
          const response = await fetch(`${api_url}/products/${id}`,{
            method:"DELETE"
          });
          const data = await response.json();
          console.log(data)
          get_data();
          toast.success("Removed product!!");
        } catch (error) {
            
        }
    }
    const edit_data = async (id) =>{}
      const dataSource = data?.map((item, index) => ({
        key: item?.id,
        number: index + 1,
        title: item?.title,
        images: item?.image,
        category: item?.category,
        description: item?.description,
        price:item?.price,
        name:item?.name,
        action: (
          <>
          <div className='flex gap-x-2'>

            <button
              onClick={()=>remove_data(item?.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2 cursor-pointer"
            >
              Delete
            </button>
            <button
              
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
          </>
        ),
      }));
    
      const columns = [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
            title: "Price",
            dataIndex:"price",
            key:"price"
        },
        {
            title: "Category",
            dataIndex:"category",
            key:"category"
        },
        {
            title: "Description",
            dataIndex:"description",
            key:"category"
        },
        {
          title: "Images",
          dataIndex: "images",
          key: "images",
          render: (item, index) => (
            <img className="w-10 h-10" src={item} alt={index} />
          ),
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
        },
      ];
      
  return (
    <div className=''>
       <Table
          className="my-8"
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
    </div>
  )
}
