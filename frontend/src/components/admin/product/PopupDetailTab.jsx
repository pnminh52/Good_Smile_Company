import React, { useState } from "react";

const PopupDetailTab = ({ product, onClose }) => {
    const [activeTab, setActiveTab] = useState("info");

  if (!product) return null;


  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full h-[500px] relative flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-300 rounded-full px-2"
        >
          ✖
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-center p-4">{product.name}</h2>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 p-2 ${
              activeTab === "info" ? "border-b-2 border-blue-500 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("info")}
          >
            Info
          </button>
          <button
            className={`flex-1 p-2 ${
              activeTab === "images" ? "border-b-2 border-blue-500 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("images")}
          >
            Images
          </button>
          <button
            className={`flex-1 p-2 ${
              activeTab === "specs" ? "border-b-2 border-blue-500 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("specs")}
          >
            Specs
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "info" && (
            <div className="space-y-2">
              <img
                src={product.base_image}
                alt={product.name}
                className="w-40 h-40 object-cover mx-auto mb-4"
              />
              <img className="border" src={product.imagecopyright} alt="" />
              <p><strong>Series:</strong> {product.series || "N/A"}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Status:</strong> {product.status}</p>
              <p><strong>Category:</strong> {product.category_name || "None"}</p>
              <div>
                <strong>Description:</strong>
                <p className="text-gray-700">{product.description}</p>
              </div>
            </div>
          )}

          {activeTab === "images" && (
            <div className="grid grid-cols-3 gap-2">
              {product.additional_images?.length > 0 ? (
                product.additional_images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`additional-${i}`}
                    className="w-full h-24 object-cover rounded"
                  />
                ))
              ) : (
                <p className="text-gray-500">No additional images</p>
              )}
            </div>
          )}

          {activeTab === "specs" && (
           <div className="space-y-2">
           {product.decalProduction && (
             <p><strong>Decal Production:</strong> {product.decalProduction}</p>
           )}
           {product.specifications && (
             <p><strong>Specifications:</strong> {product.specifications}</p>
           )}
           {product.sculptor && (
             <p><strong>Sculptor:</strong> {product.sculptor}</p>
           )}
           {product.planningAndProduction && (
             <p><strong>Planning & Production:</strong> {product.planningAndProduction}</p>
           )}
           {product.productionCooperation && (
             <p><strong>Production Cooperation:</strong> {product.productionCooperation}</p>
           )}
           {product.paintwork && (
             <p><strong>Paintwork:</strong> {product.paintwork}</p>
           )}
           {product.manufacturer && (
             <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
           )}
           {product.distributedby && (
             <p><strong>Distributed By:</strong> {product.distributedby}</p>
           )}
           {product.copyrightseries && (
             <p><strong>Copyright Series:</strong> {product.copyrightseries}</p>
           )}
         </div>
         
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupDetailTab;
