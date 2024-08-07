import { Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Products() {
  const [data, setData] = useState();
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const [id, setId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initilaState= {title:"", description:"", category:"", image:"", price:""} ;
  const [state, setState] = useState(initilaState);
  
  useEffect(() => {
    get_data();
  }, []);
  const get_data = async () => {
    try {
      const response = await fetch(`${api_url}/products`);
      const data = await response?.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const remove_data = async (id) => {
    try {
      const response = await fetch(`${api_url}/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      get_data();
      toast.success("Removed product!!");
    } catch (error) {}
  };
  const edit_data = async () => {
    try {
      const response = await fetch(`${api_url}/products/${id}`,{
        method:"PUT",
        body: JSON.stringify(state)
      });
      if(response.ok){
        toast.success("Edted");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.success("Error")
    }
  };
  const edit_item = async (item) => {

    setId(item?.id);
    console.log(id)
    setIsModalOpen(true);
    setState(item)
  };
  const handelChange = (e) =>{
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  console.log(id);
  const dataSource = data?.map((item, index) => ({
    key: item?.id,
    number: index + 1,
    title: item?.title,
    images: item?.image,
    category: item?.category,
    description: item?.description,
    price: item?.price,
    name: item?.name,
    action: (
      <>
        <div className="flex gap-x-2">
          <button
            onClick={() => remove_data(item?.id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2 cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={() => edit_item(item)}
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
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "category",
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
    <div className="">
      <div classNmae="products">
        <h2 className="text-center font-normal text-xl">All Products </h2>
        <Table
          className="my-8"
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
        <Modal title="Basic Modal" open={isModalOpen} onOk={()=>edit_data()} onCancel={()=>setIsModalOpen(false)}>
        <Input onChange={handelChange} name="title" value={state.title} className="my-4" type="text" placeholder="Title" />
        <Input onChange={handelChange} name="price" value={state.price} className="my-4" type="number" placeholder="Price" />
        <Input onChange={handelChange} name="category" value={state.category} className="my-4" type="text" placeholder="Category" />
        <Input onChange={handelChange} name="description" value={state.description} className="my-4" type="text" placeholder="Description" />
        <Input onChange={handelChange} name="image" value={state.image} className="my-4" type="url" placeholder="Image Url" />
      </Modal>
      </div>
    </div>
  );
}
