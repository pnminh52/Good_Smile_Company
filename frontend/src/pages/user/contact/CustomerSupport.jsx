import React from "react";

const CustomerSupport = () => {
  return (
    <div className="max-w-screen-xl mx-auto lg:px-40 px-4 text-[15px]">
      <h1 className="font-semibold sm:py-4 text-xl py-6">Customer Support</h1>
      <p>
        It may take up to 4 working days for the reply or longer in some cases.
      </p>
      <h1 className="font-semibold  text-xl py-4">Notes Regarding Inquiries</h1>
      <ul className="list-disc list-inside space-y-2  ">
        <li>
          {" "}
          Depending on the content of your inquiry, we may not be able to
          respond.
        </li>
        <li> Please provide photos in ".png"or ".jpg" format.</li>
        <li>
          {" "}
          Avoid providing too many photos as email delivery issues may occur.
        </li>
        <li>
          {" "}
          Please make sure that your mailbox allows emails from our domain
          "@goodsmilesupport.zendesk.com".
        </li>
        <li> We may send service survey emails to customers.</li>
        <li>
          {" "}
          Product ideas or proposals will not be accepted. In addition, We do
          not assume any obligation or responsibility regarding such proposals.
        </li>
        <li>
          The content of our response to customers is based on the information
          provided and the circumstances of each customer, and may not be
          applicable to all customers. Therefore, please do not translate,
          forward or share any part of our reply online.
        </li>
      </ul>

      <h1 className="font-semibold  text-xl py-4">Inquiries about product defects</h1>

    <div className="space-y-2">
    <div>
     <p>
      If there is any problem with the product you received, please contact us using the inquiry form.
      </p>
      <p>
      Please be sure to check the FAQs below before contacting us.
      </p>
     </div>

      <ul className="  list-disc list-inside space-y-2">
        <li>Products eligible for customer support</li>
        <li>What to do in case of defective products</li>
        <li>Regarding request for unopened product exchange</li>
      </ul>
<p className="text-red-600 italic text-sm">Stains or scratches that occur in areas that do not affect appearance e.g., foot sole of the scale figure, which is completely hidden when the figure is assembled may not be eligible for support.</p>


    </div>
    <h1 className="font-semibold  text-xl py-4">Inquiries about Good Smile Company Online Store</h1>

    <div>
<p>Please contact us using the inquiry form.</p>
<p className="text-red-500 italic text-sm">Be sure to provide the email address used to register your account.</p>
    </div>
    <h1 className="font-semibold  text-xl py-4">How to use the inquiry form</h1>
    <ul className="space-y-2 list-disc list-inside  ">
        <li>Click on “Submit a request” at the top right corner.</li>
        <li>For inquiries about product defects, select “Defects, missing parts or other product-related inquiry“
        For inquiries about the Good Smile Company Online Store, select “Inquiry about pre-order, payment or shipment“</li>
        <li>After selecting your inquiry category, please fill in the details of your inquiry.</li>
    </ul>

    <h1 className="font-semibold  text-xl py-4">Handling of Personal Information</h1>
<div className="space-y-2">
<p>Personal information provided will be used only to the extent necessary for interaction with customers. If you provide us with your personal information, we assume that you have given us permission to use your personal information in accordance with this policy.</p>
<ul className="space-y-2 list-disc list-inside  ">
    <li>Provision of services;</li>
    <li>Development and improvement of products and services.</li>
</ul>

<p>For more details, we recommend that you read our privacy policy here <span className=" ">(Japanese available only).</span></p>


</div>

    </div>
  );
};

export default CustomerSupport;
