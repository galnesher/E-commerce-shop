import {
    BrowserRouter as Link,
} from "react-router-dom";
const About = () => {


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="bg-light">
                        <div className="container py-5">
                            <div className="row h-100 align-items-center py-5">
                                <div className="col-lg-6">
                                    <h1 className="display-4">About us</h1>
                                    <p className="lead text-muted mb-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                                    <p className="lead text-muted">Snippet by <Link to="/" className="text-muted">
                                        <u>Lorem ipsum </u></Link>
                                    </p>
                                </div>
                                <div className="col-lg-6 d-none d-lg-block"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png" alt="" className="img-fluid" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white py-5">
                        <div className="container py-5">
                            <div className="row align-items-center mb-5">
                                <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                                    <h2 className="font-weight-light">Lorem ipsum dolor sit amet</h2>
                                    <p className="font-italic text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><button className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</button>
                                </div>
                                <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-lg-5 px-5 mx-auto"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/img-2_vdgqgn.jpg" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                                <div className="col-lg-6"><i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
                                    <h2 className="font-weight-light">Lorem ipsum dolor sit amet</h2>
                                    <p className="font-italic text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><Link to="/" className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
export default About;