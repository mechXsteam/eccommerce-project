import React from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ProductImageZoom = (props) => {
    const {product_image} = props
    return (
        <TransformWrapper>
            <TransformComponent>
                <img className={"product-zoom"} src={product_image}  alt={"product"}/>
            </TransformComponent>
        </TransformWrapper>
    );
};
export default ProductImageZoom