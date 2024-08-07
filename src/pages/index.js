import Products from '@/components/products/Products'
import Dashboard from '@/components/sidebar/Sidebar'
import Head from 'next/head'
import React from 'react'
export default function Home() {
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <div className=' '>
      <Head>
        <title>
          Dashboard page
        </title>
      </Head>
      <div>
      <Products/>
      </div>
    </div>
  )
}
