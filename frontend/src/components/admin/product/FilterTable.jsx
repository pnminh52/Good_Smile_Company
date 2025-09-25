import React, { useState, useEffect } from "react";
import { Input, Select, Button, Row, Col, Slider, Space } from "antd";

const { Option } = Select;

const FilterTable = ({ categories = [], onFilterChange }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([2000000, 10000000]);
  const [stockRange, setStockRange] = useState([0, 100]);
  const [dateOrder, setDateOrder] = useState("");

  useEffect(() => {
    onFilterChange({
      name: name || undefined,
      category: category || undefined,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      stockMin: stockRange[0],
      stockMax: stockRange[1],
      dateOrder: dateOrder || undefined,
    });
  }, [name, category, priceRange, stockRange, dateOrder]);

  const handleReset = () => {
    setName("");
    setCategory("");
    setPriceRange([2000000, 10000000]);
    setStockRange([0, 100]);
    setDateOrder("");
  };

  return (
    <div className="bg-white p-4 rounded mb-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Select category"
            value={category || undefined}
            onChange={(val) => setCategory(val)}
            style={{ width: "100%" }}
            allowClear
          >
            {categories.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <label className="block mb-1">Price range</label>
          <Slider
            range
            min={2000000}
            max={10000000}
            step={10000}
            value={priceRange}
            onChange={setPriceRange}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <label className="block mb-1">Stock range</label>
          <Slider
            range
            min={0}
            max={100}
            step={1}
            value={stockRange}
            onChange={setStockRange}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Sort by release date"
            value={dateOrder || undefined}
            onChange={(val) => setDateOrder(val)}
            style={{ width: "100%" }}
            allowClear
          >
            <Option value="newest">Newest → Oldest</Option>
            <Option value="oldest">Oldest → Newest</Option>
          </Select>
        </Col>
      </Row>
      <Row justify="end" style={{ marginTop: 12 }}>
        <Space>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </Row>
    </div>
  );
};

export default FilterTable;
