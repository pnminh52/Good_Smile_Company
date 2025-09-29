import React from "react";

const BrandSelect = ({ form, setForm }) => {
  const brands = [
    {  url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/1/logo_gsc.png" },
    {  url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/112/57_Sorarain.png" },
    {  url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/18/86_Phat.png" },
    {  url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/48/08_アニプレックス.png" },
    {  url: "https://www.goodsmile.com//gsc-webrevo-sdk-storage-prd/maker/info/2728/original/small-logo-57c579d7080e38374ef559cea6f51ac7.jpg" },
    {  url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/145/41_claynel.png" },
    {  url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/2/logo_mxf.png" },
    {  url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/105/120_Miyuki.png" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold">Brand</label>
      <div className="grid grid-cols-4 gap-4">
        {brands.map((b, index) => (
          <div
            key={index}
            onClick={() =>
              setForm({ ...form, imagecopyright: b.url })
            }
            className={`cursor-pointer border rounded p-2 flex flex-col items-center justify-center transition 
              ${
                form.imagecopyright === b.url
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-300"
              }`}
          >
            <img
              src={b.url}
              className="w-16 h-16 object-contain mb-2"
            />
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default BrandSelect;