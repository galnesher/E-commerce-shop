import React, { useState, } from "react";
import { baseUrl } from "../../utils";

const DeleteProduct = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [productId, setProductId] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductId(productId => ({ ...productId, [name]: value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${baseUrl}/api/product/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "productId": productId,
                'Accept': 'application/json'
            },
            body: JSON.stringify(productId),
        }).then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setSuccess(data.success.message)
                } else {
                    setError(data.error.message)
                }
            })
    }
    return (
        <>
            <div className="container vh-100">
                <div className="row">
                    <form className="form" onSubmit={handleSubmit}>
                        <h2>Delete Product By ID</h2>
                        <div className="form-group">
                            <label htmlFor="deleteProductInput">Product ID</label>
                            <input type="text" id="deleteProductInput" className="form-control" name="productId" onChange={handleChange} placeholder="Example: 602e33ffbbfb7126b410e4d3" />
                        </div>
                        <button type="submit" className="btn btn-danger">Delete Product</button>
                        {success ? (
                            <h3 className="text-success" >{success}</h3>
                        ) : (
                            <>
                                {error && (
                                    <h3 className="text-danger" >{error}</h3>
                                )}
                            </>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}
export default DeleteProduct;