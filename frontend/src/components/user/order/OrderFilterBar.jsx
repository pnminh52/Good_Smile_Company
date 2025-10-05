import React from "react";
import { Select, Input } from "antd";
import PriceFilter from "./../listProduct/PriceFilter";

const { Option } = Select;

const OrderFilterBar = ({
  status,
  sortOrder,
  keyword,
  onChange,
  priceRange,
  sortQuantity,
  sortTotal,
  paymentMethod
}) => {
  const handleFieldChange = (field) => (value) => {
    onChange({ [field]: value ?? undefined });
  };

  return (
    <div className="space-y-3">
      <Input
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

      <div className="flex flex-col gap-[12px]">
        <Select
          placeholder="Sort by status"
          value={status || undefined}
          onChange={handleFieldChange("status")}
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
        <Select
  placeholder="Sort by payment method"
  value={paymentMethod || undefined}
  onChange={handleFieldChange("paymentMethod")}
  allowClear
  size="large"
  className="w-full"
>
  <Option value="Cash On Delivery">Cash On Delivery</Option>
  <Option value="Online Banking">Online Banking</Option>
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
  <Option value="this_year">This Year</Option>
  <Option value="this_month">This Month</Option>
  <Option value="this_week">This Week</Option>
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

        <Select
          placeholder="Sort by total"
          value={sortTotal || undefined}
          onChange={handleFieldChange("sortTotal")}
          allowClear
          size="large"
          className="w-full"
        >
          <Option value="asc">Low → High</Option>
          <Option value="desc">High → Low</Option>
        </Select>
      </div>
    </div>
  );
};

export default OrderFilterBar;
