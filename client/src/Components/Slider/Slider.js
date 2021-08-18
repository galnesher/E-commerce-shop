import './slider.css';
import React from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Slider = () => {


    return (
        <>
            <div id="carouselExample1" className="carousel slide touch z-depth-1-half" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://res.cloudinary.com/dorromano/image/upload/v1614591428/ezgif.com-gif-maker_3_ill1md.webp" width="100%" height="500px" className="banner" alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://res.cloudinary.com/dorromano/image/upload/v1614591093/ezgif.com-gif-maker_2_tmpszz.webp" className="banner" width="100%" height="500px" alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://res.cloudinary.com/dorromano/image/upload/c_scale,w_768/v1614591094/ezgif.com-gif-maker_ydj8g8.webp" width="100%" height="500px" className="banner" alt="Third slide" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Slider;

