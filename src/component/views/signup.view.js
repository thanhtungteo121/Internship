import React from "react";

import IndexSignUp from "../contents/signup.component";

//import Footer from "../Footers/footer.component";
// import ProductPage from "../Content/shop.component";

function SignUpIndex() {
React.useEffect(() => {
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });
    return (
        <>
            <IndexSignUp />
            <div className="wrapper"> 
                <div className="main">
                    {/* <ProductPage /> */}
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
}

export default SignUpIndex;