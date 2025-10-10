import React from 'react'
import BrandSelect from './BrandSelect'
const Form = ({form, categories ,addAdditionImage, handleSubmit, setForm, handleAdditionImageChange, removeAdditionImage}) => {
  return (
    <div>  <form
    onSubmit={handleSubmit}
    className="grid grid-cols-1 gap-4 bg-white p-6 rounded-xl shadow"
  >
    {/* Basic Info */}
    <input
      className="border rounded p-2"
      placeholder="Base Image URL"
      value={form.base_image}
      onChange={(e) =>
        setForm({ ...form, base_image: e.target.value })
      }
    />
      <input
          className="border rounded p-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
    <input
      className="border rounded p-2"
      placeholder="Product Name"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />
  
  <input
      type="number"
      step="0.01"
      className="border rounded p-2"
      placeholder="Price"
      value={form.price}
      onChange={(e) => setForm({ ...form, price: e.target.value })}
    />
    <BrandSelect form={form} setForm={setForm} />

    <input
      className="border rounded p-2"
      placeholder="Series"
      value={form.series}
      onChange={(e) => setForm({ ...form, series: e.target.value })}
    />
   <input
  type="date"
  className="border rounded p-2"
  value={form.release_date || new Date().toISOString().split("T")[0]}
  onChange={(e) =>
    setForm({ ...form, release_date: e.target.value })
  }
/>

    <input
      className="border rounded p-2"
      placeholder="Decal Production"
      value={form.decalProduction}
      onChange={(e) =>
        setForm({ ...form, decalProduction: e.target.value })
      }
    />
    <input
      className="border rounded p-2"
      placeholder="Specifications"
      value={form.specifications}
      onChange={(e) =>
        setForm({ ...form, specifications: e.target.value })
      }
    />
    <input
      className="border rounded p-2"
      placeholder="Sculptor"
      value={form.sculptor}
      onChange={(e) => setForm({ ...form, sculptor: e.target.value })}
    />
    <input
      className="border rounded p-2"
      placeholder="Planning and Production"
      value={form.planningAndProduction}
      onChange={(e) =>
        setForm({ ...form, planningAndProduction: e.target.value })
      }
    />
     <input
     type='number'
      className="border rounded p-2"
      placeholder="Planning and Production"
      value={form.sold}
      onChange={(e) => setForm({ ...form, sold: Number(e.target.value) })}
    />
    <div>
  <h3 className="font-semibold mb-2">🎁 Gift Items</h3>
  {form.gift_items.map((gift, i) => (
    <div key={i} className="flex flex-col gap-2 mb-2 border p-2 rounded">
      <input
        className="border rounded p-2"
        placeholder="Gift Title"
        value={gift.title}
        onChange={(e) => {
          const newGifts = [...form.gift_items];
          newGifts[i].title = e.target.value;
          setForm({ ...form, gift_items: newGifts });
        }}
      />
      <input
        className="border rounded p-2"
        placeholder="Gift Description"
        value={gift.description}
        onChange={(e) => {
          const newGifts = [...form.gift_items];
          newGifts[i].description = e.target.value;
          setForm({ ...form, gift_items: newGifts });
        }}
      />
      <input
        className="border rounded p-2"
        placeholder="Gift Image URL"
        value={gift.image}
        onChange={(e) => {
          const newGifts = [...form.gift_items];
          newGifts[i].image = e.target.value;
          setForm({ ...form, gift_items: newGifts });
        }}
      />
      <button
        type="button"
        onClick={() => {
          const newGifts = form.gift_items.filter((_, index) => index !== i);
          setForm({ ...form, gift_items: newGifts });
        }}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        ❌ Remove Gift
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setForm({
        ...form,
        gift_items: [...form.gift_items, { title: "", description: "", image: "" }],
      })
    }
    className="px-4 py-2 bg-blue-500 text-white rounded"
  >
    ➕ Add Gift
  </button>
</div>

    <input
      className="border rounded p-2"
      placeholder="Production Cooperation"
      value={form.productionCooperation}
      onChange={(e) =>
        setForm({ ...form, productionCooperation: e.target.value })
      }
    />
    <input
      className="border rounded p-2"
      placeholder="Paintwork"
      value={form.paintwork}
      onChange={(e) => setForm({ ...form, paintwork: e.target.value })}
    />
    <input
      className="border rounded p-2"
      placeholder="Related Information"
      value={form.relatedInformation}
      onChange={(e) =>
        setForm({ ...form, relatedInformation: e.target.value })
      }
    />
    <input
      className="border rounded p-2"
      placeholder="Manufacturer"
      value={form.manufacturer}
      onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
    />
    <input
      className="border rounded p-2"
      placeholder="Distributed By"
      value={form.distributedBy}
      onChange={(e) =>
        setForm({ ...form, distributedBy: e.target.value })
      }
    />
    <input
      className="border rounded p-2"
      placeholder="Copyright / Series Owner"
      value={form.copyrightSeries}
      onChange={(e) =>
        setForm({ ...form, copyrightSeries: e.target.value })
      }
    />
   
    <input
      type="number"
      className="border rounded p-2"
      placeholder="Stock"
      value={form.stock}
      onChange={(e) => setForm({ ...form, stock: e.target.value })}
    />
    <select
      value={form.status}
      onChange={(e) => setForm({ ...form, status: e.target.value })}
      className="border rounded p-2"
    >
      <option value="available">Available</option>
      <option value="preorder">Pre-Order</option>
      <option value="soldout">Sold Out</option>
    </select>
   

    {/* Category */}
    <select
      value={form.category_id || ""}
      onChange={(e) =>
        setForm({
          ...form,
          category_id:
            e.target.value === "" ? null : Number(e.target.value),
        })
      }
      className="border rounded p-2"
    >
      <option value="">-- Select Category --</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>

    {/* Additional Images */}
    <div>
      <h3 className="font-semibold mb-2">📷 Additional Images</h3>
      {form.additional_images.map((img, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="border rounded p-2 flex-1"
            placeholder="Image URL"
            value={img}
            onChange={(e) =>
              handleAdditionImageChange(i, e.target.value)
            }
          />
          <button
            type="button"
            onClick={() => removeAdditionImage(i)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            ❌
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addAdditionImage}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        ➕ Add Image
      </button>
    </div>

    {/* Description */}
    <textarea
      className="border rounded p-2"
      placeholder="Description"
      value={form.description}
      onChange={(e) =>
        setForm({ ...form, description: e.target.value })
      }
    />

    {/* Submit */}
    <button
      type="submit"
      className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
    >
      ✅ Create Product
    </button>
  </form></div>
  )
}

export default Form