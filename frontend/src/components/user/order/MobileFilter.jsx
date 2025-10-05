import React, { useState } from "react";
import { Drawer, Button, Select, Input } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import PriceFilter from "./../listProduct/PriceFilter";

const { Option } = Select;

const MobileFilter = ({
  status,
  sortOrder,
  keyword,
  onChange,
  priceRange,
  sortQuantity,
  sortTotal,
  paymentMethod
}) => {
  const [open, setOpen] = useState(false);

  const handleFieldChange = (field) => (value) => {
    onChange({ [field]: value ?? undefined });
  };

  return (
    <div className="flex  gap-2 items-center w-full">
      <Input
        placeholder="Search orders..."
        value={keyword}
        onChange={(e) => handleFieldChange("keyword")(e.target.value)}
        allowClear
        size="large"
        className="w-full"
      />

 <button  className="border w-10 h-10 rounded-lg border-gray-300"   onClick={() => setOpen(true)}>
  <FilterOutlined />
  </button>
     
   {
    open && (
        <div className="fixed inset-0 z-50 flex">
 <div
    className="fixed inset-0 bg-black/40 bg-opacity-40"
    onClick={() => setOpen(false)}
  ></div>
<div className="relative bg-white w-4/5 max-w-xs h-full p-4 overflow-y-auto">
<div className=" ">
  {/* Price range */}
  <PriceFilter
    priceRange={priceRange}
    setPriceRange={(value) => handleFieldChange("priceRange")(value)}
    min={2000000}
    max={100000000}
  />

<div className="flex flex-col gap-[12px]">
      {/* Status */}
      <Select
        placeholder="Sort by status"
        value={status || undefined}
        onChange={(value) => {
            handleFieldChange("status")(value);
            setOpen(false);
          }}      
            allowClear
        size="large"
        className="w-full"
      >
        <Option value="pending">Pending</Option>
        <Option value="processing">Processing</Option>
        <Option value="shipped">Shipped</Option>
        <Option value="completed">Completed</Option>
        <Option value="canceled">Canceled</Option>
      </Select>
       
    
      {/* Date */}
      <Select
        placeholder="Sort by date"
        value={sortOrder || undefined}
        onChange={(value) => {
            handleFieldChange("sortOrder")(value);
            setOpen(false);
          }}
        allowClear
        size="large"
        className="w-full"
      >
        <Option value="newest">Newest → Oldest</Option>
        <Option value="oldest">Oldest → Newest</Option>
        <Option value="this_year">This Year</Option>
        <Option value="this_month">This Month</Option>
        <Option value="this_week">This Week</Option>
      </Select>

      <Select
        placeholder="Sort by payment method"
        value={paymentMethod ?? undefined}
        onChange={(value) => {
          handleFieldChange("paymentMethod")(value);
          if (value) setOpen(false); 
        }
        

          
        }
        allowClear
        size="large"
        className="w-full"
      >
        <Option value="Cash On Delivery">Cash On Delivery</Option>
        <Option value="Online Banking">Online Banking</Option>
      </Select>
    
      {/* Quantity */}
      <Select
        placeholder="Sort by quantity"
        value={sortQuantity || undefined}
        onChange={(value) => {
            handleFieldChange("sortQuantity")(value);
            setOpen(false);
          }}
        allowClear
        size="large"
        className="w-full"
      >
        <Option value="asc">Few → Many</Option>
        <Option value="desc">Many → Few</Option>
      </Select>
    
      {/* Total */}
      <Select
        placeholder="Sort by total"
        value={sortTotal || undefined}
        onChange={(value) => {
            handleFieldChange("sortTotal")(value);
            setOpen(false);
          }}
        allowClear
        size="large"
        className="w-full"
      >
        <Option value="asc">Low → High</Option>
        <Option value="desc">High → Low</Option>
      </Select>
</div>
</div>
</div>
        </div>
    )


   
   }
    </div>
  );
};

export default MobileFilter;
