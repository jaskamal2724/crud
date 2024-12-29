import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get");
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete("http://localhost:5000/delete", {
        data: { id },
      });
      alert(response.data.message); // Show success message
      setProducts(products.filter((product) => product._id !== id)); // Remove deleted product from the state
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete the product.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="table-container">
      <h2 className="table-title">Products Table</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td> {/* Display serial number */}
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
