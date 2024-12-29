import React, { useState } from "react";

const AddProduct = () => {
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productDetails),
      });

      const result = await response.json();
      console.log("Product Added:", result);

      // Close modal and reset form
      setShowModal(false);
      setProductDetails({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product!");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Product
      </button>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Add Product
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}
            >
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={productDetails.title}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={productDetails.price}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <label>Description:</label>
              <textarea
                name="description"
                value={productDetails.description}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={productDetails.image}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={productDetails.category}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
