import React, {  useEffect, useState } from 'react'


const ShowOrderProduct = ({ items }) => {

  
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)


  useEffect(() => {
    let qty = 0;
    let price = 0;

    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty += items[i].qty;
        price += items[i].price
      }
    }
    setPrice(price)
    setQty(qty)
  }, [items])

  return (
    <>
      <table className="table table-bordered border-primary bg-dark text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-dark text-light">Product Img</th>
            <th scope="col" className="bg-dark text-light">Title</th>
            <th scope="col" className="bg-dark text-light">Price</th>
            <th scope="col" className="bg-dark text-light">Quantity</th>
           
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
            <tr key={product._id}>
              <th scope="row" className="bg-dark text-light">
                <img src={product.imgSrc} style={{ width: '70px', height: '70px' }} />
              </th>
              <td className="bg-dark text-light">{product.title}</td>
              <td className="bg-dark text-light">{product.price}</td>
              <td className="bg-dark text-light">{product.qty}</td>
             
            </tr>

          ))}




          <tr>
            <th scope="row" className="bg-dark text-light">
            </th>
            <td className="bg-dark text-light">
              {" "}
              <button className="btn btn-primary">Total</button>{" "}
            </td>
            <td className="bg-dark text-light">{" "}
              <button className="btn btn-warning">{price}</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info">{qty}</button>
            </td>
            
          </tr>




        </tbody>
      </table>
    </>
  )
}

export default ShowOrderProduct;