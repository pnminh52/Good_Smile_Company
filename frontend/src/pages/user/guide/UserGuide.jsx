import React from "react";

const UserGuide = () => {
  return (
    <div className="max-w-screen-xl mx-auto lg:px-60 px-4">
      <h1 className="font-semibold sm:py-4 text-xl py-6">About Orders</h1>
      <div className="text-[15px] space-y-4">
        <p className="font-semibold">
                *The information on this page applies to orders shipped to regions other
                than Japan and Taiwan.
              </p>
              <p>
                To place orders, a Good Smile Company Online Store account is required
                (Registration is free with no annual subscription fees). Please keep
                your login information safe.
              </p>
              <p>
                Your password must not include spaces and must contain all of the
                following:{" "}
              </p>
              <ul>
                <li>Half-width lowercase letters </li>
                <li>Half-width uppercase letters </li>
                <li>Numbers and symbols </li>
              </ul>
      </div>
         <h1 className="font-semibold py-4 text-xl ">Regarding Preorders</h1>
    <div className="space-y-4 text-[15px]">
          <p>
                The majority of products available for purchase on the Good Smile
                Company Online Store are preorder products. Please note that adequate
                time will be needed to manufacture and deliver the product once
                preorders have ended. Please check the scheduled release date of each
                product before ordering.
              </p>
        
              <p className="text-red-500">
                All communication regarding ordered items will be sent to the registered
                email address provided. Please ensure that you are able to receive
                emails from the Good Smile Company Online Store.
              </p>
        
              <p>
                The release date indicated for each product at the start of the preorder
                period may be subject to change due to manufacturing circumstances
                without prior notice.
              </p>
        
              <p>
                Requests to cancel orders due to altered release dates
                (advancements/delays) will not be accepted.
              </p>
        
              <p>
                If an order are placed by a minor, it is assumed that a parent or legal
                guardian has given consent to using the Good Smile Company Online Store.
                We do not guarantee nor ensure that any information available on Good
                Smile Company Online Store will not be harmful to minors.
              </p>
        
              <p>
                Some products may not be available for purchase in certain regions due
                to intellectual property licensing.
              </p>
        
              <p>
                In principle, we do not accept returns or refunds for purchased items.
                Even if the product is defective, we will replace the defective product.
              </p>
    </div>
         <h1 className="font-semibold py-4 text-xl ">Regarding Orders</h1>
     <div className="space-y-4 text-[15px]">
         <p>We do not accept orders via phone, email or post.</p>
        
              <p>
                After placing an order, please confirm that you have received an order
                confirmation email via your registered email address and that you are
                able to view the order history on your My Account page.
              </p>
        
              <p>
                There is a limit on the number of items that can be preordered per
                order.
              </p>
        
              <p>
                Please contact customer support if you wish to cancel your order.
                Depending on the status of your order, we may be able to accommodate
                your request.
              </p>
     </div>
         <h1 className="font-semibold py-4 text-xl ">About Order Numbers</h1>
     <div className="text-[15px] space-y-4">
         <p>
                The order number of an order will differ depending on the time an order
                is placed.
              </p>
        
              <p>
                Please refer to the Shipping & Shipping Fees user guide for information
                regarding order numbers and updating the shipping address of an order.
              </p>
     </div>
         <h1 className="font-semibold py-4 text-xl ">How to Place an Order</h1>
      <ol className="list-decimal pl-5 space-y-4 text-[15px]">
  <li>Log in to your Good Smile Company Online Store account.</li>
  <li>Click the "Preorder Now" or "Add to Cart" button on the product page of the desired item.</li>
  <li>Click the "Cart" button on the top right of the screen.</li>
  <li>After checking the contents of the cart, click the "Proceed to purchase" button.</li>
  <li>Enter and select your shipping address, payment method and billing address.</li>
  <li>Confirm your order and click the "Confirm Order" button once.</li>
  <li>Once the message "Your order has been processed successfully. Thank you for shopping with us." is displayed, the order has been completed.</li>
  <li>
    After the shipping date is confirmed, you will be informed via e-mail of the confirmed shipping date (payment will be carried out before or after the announcement of the confirmed shipping date) (3*)
  </li>
  <li>
    The product will be shipped from our company warehouse on the confirmed shipping date indicated.
    <p className="text-gray-500 mt-2">
     
      ・If there is a change in shipping date, you will be contacted via the registered email address provided.<br/>
      ・If a payment error occurs during the shipping settlement, you will be contacted via the registered email address provided. Please ensure that payment is made within a week from receipt of the email. If payment is not complete within a week, the order will be canceled.
    </p>
  </li>
</ol>
   <h1 className="font-semibold py-4 text-xl ">Membership Withdrawal (Account Deletion)</h1>
<p className="text-[15px]">Please check the FAQ below and contact customer support if you would like to request termination of an account. Account termination is only possible if there are no unshipped orders at the time of request.</p>

    </div>
  );
};

export default UserGuide;
