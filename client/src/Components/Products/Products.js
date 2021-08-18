import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency } from "../../utils";
import './products.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { filterProductsAction, orderProductsByPriceAction } from "../../Redux/Action/productAction";
import { addToCartAction } from "../../Redux/Action/cartAction";

const customStyles = {
    content: {
        top: '20%',
        right: '10%',
        left: '10%',
    },
};

const Products = () => {
    const ProductsFromStore = useSelector(state => state.ProductReducer);
    const CategoriesFromStore = useSelector(state => state.CategoriesReducer);
    const [productModal, setProductModal] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOrderByPrice, setSelectedOrderByPrice] = useState(null);
    const dispatch = useDispatch();

    const openModal = (product) => {
        setProductModal({ product });
    };

    const closeModal = () => {
        setProductModal(null)
    };

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
    }
    useEffect(() => {
        if (selectedCategory !== null) {
            dispatch(filterProductsAction(selectedCategory));
        }
    }, [dispatch, selectedCategory]);

    const handleOrderByPrice = (e) => {
        setSelectedOrderByPrice(e.target.value)
    }


    useEffect(() => {
        let products = ProductsFromStore.products;
        if (selectedOrderByPrice !== null) {
            dispatch(orderProductsByPriceAction(products, selectedOrderByPrice));
        }
        return () => {
            setSelectedOrderByPrice(null);
        }
    }, [ProductsFromStore.products, dispatch, selectedOrderByPrice]);


    const addToCartHandler = () => {
        dispatch(addToCartAction(productModal.product));
        closeModal();
    }


    return (
        <>
            <Fade bottom>
                <div className="container-fluid">
                    <div className="row navbar m-3">
                        <div className="col">
                            <div className="form-group">
                                <select id="orderby" className="custom-select" onChange={handleChangeCategory}>
                                    <option value='all'>All Products</option>
                                    {CategoriesFromStore.categories && (
                                        <>
                                            {CategoriesFromStore.categories.map(category => (
                                                <option key={category._id} value={category.name}>{category.name}</option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <select className="custom-select" defaultValue='all' id="filterby" onChange={handleOrderByPrice}>
                                    <option value="all" disabled >Price</option>
                                    <option value="highest">Highest</option>
                                    <option value="lowest">Lowest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row ">
                    {ProductsFromStore.products && ProductsFromStore.products.length > 0 ? (
                        <>
                            {ProductsFromStore.products.map((product) => (
                                <div key={product._id} className="col-sm-3 mb-2 " >
                                    <div className="card "  >
                                        <a href={"#" + product._id} onClick={() => openModal(product)}>
                                            <LazyLoadImage
                                                className="card-img-top img-responsive"
                                                effect="blur"
                                                src={product.imageUrl}
                                                alt={product.name}
                                                width="100%"
                                                height="100%"
                                            />
                                        </a>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p>{product.shortDesc}</p>
                                            <hr />
                                            <div className="row">
                                                <h6 className="col">Price : {formatCurrency(product.price)}</h6>
                                            </div>
                                            <button className="btn btn-sm btn-success float-left" onClick={() => { dispatch(addToCartAction(product)) }}>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="container">
                            <div className="row justify-content-center">
                                <span>
                                    <i className="fa-5x fa fa-spinner fa-spin"> </i>
                                </span>
                            </div>
                        </div>
                    )
                    }
                </div>
            </Fade>

            {productModal && (
                <>
                    <Modal ariaHideApp={false}
                        isOpen={true}
                        onRequestClose={closeModal}
                        style={customStyles} >
                        <Zoom>
                            <div className="container">
                                <button className="mb-3 btn-danger" onClick={closeModal}>X</button>
                                <div className="row">
                                    <div className="col-md-6">
                                        <LazyLoadImage
                                            className="card-img-top img-responsive"
                                            effect="blur"
                                            src={productModal.product.imageUrl}
                                            alt={productModal.product.name}
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                    <div className="col">
                                        <h3>{productModal.product.name}</h3>
                                        <h6>{productModal.product.shortDesc}</h6>
                                        <hr />
                                        <p>{productModal.product.longDesc}</p>
                                        <div className="row">
                                            <h6 className="col">Price: {formatCurrency(productModal.product.price)}</h6>
                                        </div>
                                        <button className="btn btn-success float-left" onClick={addToCartHandler}>Add To Cart {formatCurrency(productModal.product.price)}</button>
                                    </div>

                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                </>
            )}
        </>
    )
}
export default Products;