// components/user/order/OrderFilterBar.jsx
import React from "react";
import { Select, Input, Divider } from "antd";
import PriceFilter from "./../listProduct/PriceFilter";

const { Option } = Select;

const OrderFilterBar = ({
  status,
  sortOrder,
  keyword,
  onChange,
  priceRange,
  sortQuantity
}) => {
  const handleFieldChange = (field) => (value) => {
    onChange({ [field]: value });
  };

  return (
    <div className=" space-y-3">
      <Input
        // style={{ marginBottom: 16 }}
        placeholder="Search..."
        value={keyword}
        onChange={(e) => handleFieldChange("keyword")(e.target.value)}
        allowClear
        size="large"
      />
      <PriceFilter
        priceRange={priceRange}
        setPriceRange={(value) => handleFieldChange("priceRange")(value)}
        min={2000000}
        max={100000000}
      />

      <div className="flex flex-col gap-[12px] ">
        <Select
          placeholder="Sort by status"
          value={status || undefined}
          onChange={handleFieldChange("status")}
          allowClear
          size="large"
          className="w-full"
        >
          <Option value="">Sort by status</Option>
          <Option value="pending">Pending</Option>
          <Option value="processing">Processing</Option>
          <Option value="shipped">Shipped</Option>
          <Option value="completed">Completed</Option>
          <Option value="canceled">Canceled</Option>
        </Select>

        <Select
          placeholder="Sort by date"
          value={sortOrder || undefined}
          onChange={handleFieldChange("sortOrder")}
          allowClear
          size="large"
          className="w-full"
        >
          <Option value="newest">Newest → Oldest</Option>
          <Option value="oldest">Oldest → Newest</Option>
        </Select>
        <Select
  placeholder="Sort by quantity"
  value={sortQuantity || undefined}
  onChange={handleFieldChange("sortQuantity")}
  allowClear
  size="large"
  className="w-full"
>
  <Option value="asc">Few → Many</Option>
  <Option value="desc">Many → Few</Option>
</Select>

      </div>
    </div>
  );
};

export default OrderFilterBar;
