import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
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

  // Render loading, error, or table
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="table-container" style={{ width: "100%", overflowX: "auto" }}>
      <h2 className="table-title">Products Table</h2>
      <table
        className="custom-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "auto",
        }}
      >
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Image</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id} style={{ textAlign: "center" }}>
              <td>{index + 1}</td> {/* Serial number */}
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>
                <img
                  src={product.image}
                  alt="Product"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
