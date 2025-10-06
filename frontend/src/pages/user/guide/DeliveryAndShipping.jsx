import React from 'react'
import { useEffect } from 'react'

const DeliveryAndShipping = () => {
    useEffect(()=>{
      window.scrollTo({top:0, behavior:"smooth"})
    },[])
  return (
    <div className="max-w-screen-xl mx-auto lg:px-40 px-4 text-[15px]">
      <h1 className="font-semibold sm:py-4 text-xl py-6">Shipping & Shipping Fees</h1>
      <div className='space-y-2 text-[15px]'>
<p className='font-semibold'>*The information on this page applies to orders shipped to regions other than Japan and Taiwan.</p>

    </div>
    <div className='space-y-2 text-[15px]'>
   <h1 className="text-xl  py-4 font-semibold">
    Important Notice
  </h1>
  <p className="text-gray-800 ">
    For Orders Previously Placed on the old GOODSMILE ONLINE SHOP:
  </p>
  <p className="text-gray-800">
    Changes to your shipping address and other payment information can only be made on the old GOODSMILE ONLINE SHOP.  
    Such changes to orders made on the old GOODSMILE ONLINE SHOP cannot be made on the Good Smile Company Online Store.
  </p>
</div>

<div className="">
   <h1 className="text-xl  py-4 font-semibold">
    About Shipping and Shipping Costs
  </h1>

  <ul className="list-disc list-inside space-y-2 text-gray-800">
    <li>When you preorder an item, there will be a shipping charge applicable for each type item type included in the transaction.</li>
    <li>If you preorder the same item type in a separate transaction, a different order number will be generated, resulting in an additional shipping charge for the new order number.</li>
    <li>If you purchase the same item multiple times using different transactions, each purchase will result in an additional shipping charge.</li>
    <li>When preordering different product types from the same product page, an order number will be issued for each type of product or character. Each order number will be shipped separately and shipping costs will be charged per order number.</li>
    <li>If you order an in-stock item, shipping charges are only applied per order.</li>
    <li>Shipping fees vary by region. Please check this notice for details.</li>
    <li>If you preorder items with different release dates at the same time, we will ship them sequentially. The shipping for these items will not be combined.</li>
    <li>Once the shipment date is confirmed, you will be notified via the registered email address provided (release dates can also be checked via the Good Smile Company Online Store Website).</li>
    <li>Once your order has been shipped, shipping details such as your tracking number will be sent to the registered email address provided.</li>
    <li>Good Smile Company will not be liable for deliveries that cannot be completed successfully due to any errors in shipping information provided.</li>
    <li>Please note that you will not be able to request for specific delivery dates or shipping postponement.</li>
    <li>In-stock items are typically shipped within 7 Japanese business days upon receipt of order.</li>
    <li>If there are any stains or damages to packaging at the time of delivery, please contact the courier service's customer support should you require support. As the packaging is designed to protect the product, we are unable to provide replacements for damaged packaging.</li>
  </ul>

  <h1 className="text-xl  py-4 font-semibold">
    Updating Your Shipping Address
  </h1>
  <ul className="list-disc list-inside space-y-2 text-gray-800">
    <li>If you wish to update your shipping address, please update it for every applicable order (1*).</li>
    <li>If you change the shipping address information registered in your account, the shipping address of orders that have already been placed will not be updated automatically. Please ensure to update the shipping address manually for each individual order number.</li>
  </ul>

  <p className="text-red-500 py-2 italic">
    (1*) For Orders Placed on the Old GOODSMILE ONLINE SHOP
  </p>
  <ul className="list-disc list-inside space-y-2 text-gray-800">
    <li>Orders of multiple types of products made at the same will result in only one order number. Example: If an order for three types of products was made in a single checkout, only one order number will be issued. If the shipping address for the order was updated, the change will apply to all three product types.</li>
  </ul>

  <p className="text-red-500 py-2 italic">
    For Orders Placed on the Good Smile Company Online Store
  </p>
  <ul className="list-disc list-inside space-y-2 text-gray-800">
    <li>Orders of multiple types of products made at the same time will result in an order number issued for each type of product. Example: If an order for three types of products was made in a single checkout, three different order numbers will be issued. If you would like to update the shipping address, you will be required to make the change individually for each product type (once per order number, three times in total).</li>
  </ul>

  <h1 className="text-xl  py-4 font-semibold">

    Receiving Your Order
  </h1>
  <ul className="list-disc list-inside space-y-2 text-gray-800">
    <li>The shipping deadline (storage deadline) is generally one week from the time the package has been processed at customs clearance. Please always check the tracking information of your package using your preferred tracking site and communicate directly with the shipping courier in charge of the package's delivery for further information.</li>
    <li>Please note that customs clearance deadlines may differ and you will need to contact the shipping courier or your country's customs office directly for further information.</li>
    <li>If the shipment is not received and the storage period has passed, the package will be returned to us.</li>
    <li>We are unable to extend the storage deadline if there are issues such as not being able to receive the package within the assigned storage period. Please contact the courier company and provide your tracking number for any support required.</li>
  </ul>
</div>


    </div>
  )
}

export default DeliveryAndShipping
