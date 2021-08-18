import React, { useState } from "react";
import { baseUrl } from "../../utils";
import SuccessMessage from "../SuccessMessage/SuccessMessage";


const UploadCategory = () => {

    const [resFromUploadCategory, setResFromUploadCategory] = useState(null);
    const [categoryToUpload, setCategoryToUpload] = useState();


    const handleChangeUploadCategory = (e) => {
        setCategoryToUpload(e.target.value);
    }

    const handleSubmitCategoryUpload = (e) => {
        e.preventDefault();
        fetch(`${baseUrl}/api/product/uploadcategory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name: categoryToUpload }),
        }).then((res) => res.json())
            .then((data) => {
                if (data._id) {
                    setResFromUploadCategory(data)
                } else {
                    setResFromUploadCategory(null);
                }
            })
    }

    return (
        <div className="container vh-100">
            <form onSubmit={handleSubmitCategoryUpload} className="form col">
                <h2>Upload Products Category</h2>
                <div className="form-group">
                    <label htmlFor="uploadCategory">Category Name:</label>
                    <input id="uploadCategory" onChange={handleChangeUploadCategory} type="text" className="form-control col-6" required />
                </div>
                <button className="btn btn-primary">Upload Category</button>
                <div>
                    {resFromUploadCategory && (
                        <SuccessMessage message="Category uploaded successfully" />
                    )}
                </div>
            </form>
        </div>
    )
}

export default UploadCategory;