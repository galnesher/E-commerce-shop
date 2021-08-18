import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { uploadProductAction } from "../../Redux/Action/productAction";
import SuccessMessage from "../SuccessMessage/SuccessMessage";



const UploadProduct = () => {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [shortDesc, setShortDesc] = useState();
    const [longDesc, setLongDesc] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [imageAlt, setImageAlt] = useState(null);
    const dispatch = useDispatch();
    const productFromStore = useSelector(state => state.ProductReducer);
    const CategoriesFromStore = useSelector(state => state.CategoriesReducer);


    const handleImageUpload = (e) => {
        e.preventDefault();
        const { files } = document.querySelector('input[type="file"]')
        const formData = new FormData();
        formData.append('file', files[0]);
        // replace this with your upload preset name
        formData.append('upload_preset', 'ml_default');
        const options = {
            method: 'POST',
            body: formData,
        };
        return fetch('https://api.cloudinary.com/v1_1/dorromano/image/upload', options)
            .then(res => res.json())
            .then(res => {
                setImageUrl(res.secure_url)
                setImageAlt(res.original_filename)
            })
            .catch(err => console.log(err));
    }

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (name && price && shortDesc && longDesc && selectedCategory && imageUrl) {
            const product = {
                name: name,
                price: price,
                shortDesc: shortDesc,
                longDesc: longDesc,
                category: selectedCategory,
                imageUrl: imageUrl
            }
            dispatch(uploadProductAction(product));
        } else {
            alert('אנא ודא/י כי כל השדות מלאים')
        }
    }


    return (
        <>
            <div className="container vh-100">
                <div className="row">
                    <form className="form col" onSubmit={handleImageUpload}>
                        <h1>Upload Product</h1>
                        <h4>1. Please select image product <span className="text-danger">(Only WebP File)</span></h4>
                        <div className="form-group">
                            <span htmlFor="file"> Image :</span>
                            <input className="form-control col-md-6" type="file" accept=".WebP" name="file" id="file" onChange={(e) => {
                            }} required />
                            {imageUrl && (
                                <div className="row alert-success">
                                    <h2 className="col-6">Image uploaded successfully </h2>
                                    <img className="" width={120} height={100} src={imageUrl} alt={imageAlt} />
                                </div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary ">שלח</button>
                    </form>
                </div>


                {imageUrl && (
                    <div className="container">
                        <div className="row">
                            <h4>2. Fill rest fildes</h4>
                        </div>
                        <div className=" row">
                            <form className="form" >
                                <div className="form-group">
                                    <span htmlFor="name">Product Name:</span>
                                    <input className="form-control" type="text" name="name" id="name" onChange={(e) => {
                                        const { value } = e.target;
                                        setName(value);
                                    }} required />
                                </div>
                                <div className="form-group">
                                    <span htmlFor="price">Price: </span>
                                    <input className="form-control" type="text" name="price" id="price" onChange={(e) => {
                                        const { value } = e.target;
                                        setPrice(value);
                                    }} required />
                                </div>

                                <div className="form-group">
                                    <span htmlFor="shortDesc">Short Description </span>
                                    <textarea className="form-control" type="text" name="shortDesc" id="shortDesc" rows="1" onChange={(e) => {
                                        const { value } = e.target;
                                        setShortDesc(value);
                                    }} required />
                                </div>
                                <div className="form-group">
                                    <lable htmlFor="longDesc">Long Description </lable>
                                    <textarea className="form-control" type="text" name="longDesc" id="longDesc" rows="3" onChange={(e) => {
                                        const { value } = e.target;
                                        setLongDesc(value);
                                    }} required />
                                </div>
                                <div className="form-group">
                                    <span htmlFor="category" >Category: </span>
                                    <select id="category" name="category" onChange={handleChangeCategory}>
                                        <option selected disabled value="">Categories</option>
                                        {CategoriesFromStore.categories && (
                                            <>
                                                {CategoriesFromStore.categories.map(category => (
                                                    <>
                                                        <option key={category._id} value={category.name}>{category.name}</option>
                                                    </>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                </div>
                                {productFromStore.productUploaded && (
                                    <div>
                                        {productFromStore.productUploaded.success ? (

                                            <SuccessMessage message={productFromStore.productUploaded.success} />
                                        ) : (
                                            <h4 className="col alert-danger">{productFromStore.productUploaded.error}</h4>
                                        )}
                                    </div>
                                )}
                                <button onClick={submitHandler} className="btn btn-primary">Upload Product</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UploadProduct;



