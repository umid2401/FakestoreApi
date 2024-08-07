import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'db.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newProduct = req.body;

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        return res.status(500).json({ message: 'Failed to add product to Fake Store API' });
      }

      const addedProduct = await response.json();

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      data.products.push(addedProduct);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      res.status(201).json(addedProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Failed to add product' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
