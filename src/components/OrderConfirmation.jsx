import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import ShowOrderProduct from './ShowOrderProduct'

const OrderConfirmation = () => {

  const { userOrder } = useContext(AppContext)
  const [latestOrder, setLatestOrder] = useState({})



  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0])
    }
  }, [userOrder])

  console.log("latest order", latestOrder)


  return (
    <>
      <div className="container my-5">
        <h1 className="text-center">Order Confirmed!!</h1>
        <h3 className="text-center"> It will be delieverd soon.</h3>
      </div>


      <div className="container ">



        <table className="table table-bordered border-primary bg-dark">
          <thead className='bg-dark'>
            <tr>
              <th scope="col" className="bg-dark text-light text-center">Order items</th>

              <th scope="col" className="bg-dark text-light text-center">Order Details</th>
            </tr>
          </thead>
          <tbody className='bg-dark'>
            <tr>

              <td className="bg-dark text-light">


                {/* <TableProduct cart={cart} /> */}

                <ShowOrderProduct items = {latestOrder?.orderItems}></ShowOrderProduct>


              </td>
              <td className="bg-dark text-light">
                <ul>
                  <li>OrderID:{" "}{latestOrder?.orderId}</li>
                  <li>PaymentID:{" "}{latestOrder?.paymentId}</li>
                  <li>Payment Status:{" "}{latestOrder?.payStatus}</li>
                  <li>Name:{" "}{latestOrder?.userShipping?.fullName}</li>
                  <li>Phone:{" "}{latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Country:{" "}{latestOrder?.userShipping?.country}</li>
                  <li>State:{" "}{latestOrder?.userShipping?.state}</li>
                  <li>Pincode:{" "}{latestOrder?.userShipping?.pincode}</li>
                  <li>Address:{" "}{latestOrder?.userShipping?.address}</li>

                </ul>
              </td>

            </tr>


          </tbody>
        </table>



      </div>


      {/* <div className="container text-center my-5">
        <button className="btn btn-secondary btn-lg" style={{ fontWeight: 'bold' }}

        >Proceed to pay</button>
      </div> */}

    </>
  )
}

export default OrderConfirmation