import React from "react";
import { Modal, Button } from "antd";
const NotiAlert = ({ handleVnpayPayment, handleCloseModal, open }) => {
  return (
    <div>
      <Modal
        open={open}
        title="Notice about vnPay payment method"
        onCancel={handleCloseModal}
        centered
        footer={null}
        styles={{ padding: 0 }}
        style={{ maxWidth: "95%" }}
      >
        <div>
          <p>This payment method is using sandbox environment for test</p>
    
          <div>
            <p>
              <span className="font-semibold">Bank support</span> NCB
            </p>
            <p>
              <span className="font-semibold">Account number</span>{" "}
              9704198526191432198{" "}
            </p>
            <p>
              <span className="font-semibold">Author</span> NGUYEN VAN A
            </p>
            <p>
              <span className="font-semibold">Expired date</span> 07/15
            </p>
            <p>
              <span className="font-semibold">OTP number</span> 123456
            </p>
          </div>
        
          <button
      onClick={()=>{
window.scrollTo({top:0, behavior:"smooth"})
        handleVnpayPayment
      }}
      className="mt-4 cursor-pointer w-full rounded-full bg-[#F06E00] text-white font-semibold py-2  hover:bg-[#d95f00] transition"
    >
      Confirm using this payment method
    </button>

        </div>
      </Modal>
    </div>
  );
};

export default NotiAlert;
