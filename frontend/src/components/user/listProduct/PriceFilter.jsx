import { Slider } from "antd";

const PriceFilter = ({ priceRange, setPriceRange, min = 2000000, max = 10000000 }) => {
  if (!priceRange || priceRange.length !== 2) {
    priceRange = [min, max]; // set default range nếu chưa có
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <h4 className="mb-2 font-medium">Price Range</h4>
      <Slider
        range
        min={min}
        max={max} // giới hạn tối đa
        step={50000} // bước kéo
        value={priceRange}
        onChange={(value) => setPriceRange(value)}
        tooltip={{ formatter: (val) => `${val.toLocaleString()}₫` }}
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>{priceRange[0].toLocaleString()}₫</span>
        <span>{priceRange[1].toLocaleString()}₫</span>
      </div>
    </div>
  );
};

export default PriceFilter;
