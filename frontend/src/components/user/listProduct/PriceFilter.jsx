import { Slider } from "antd";

const PriceFilter = ({ priceRange, setPriceRange }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h4 className="mb-2 font-medium">Price Range</h4>
      <Slider
        range
        min={2000000}
        max={10000000} // Giới hạn tối đa
        step={50000} // Bước kéo (50k)
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
