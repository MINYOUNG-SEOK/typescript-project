// components/ImageWithFallback.tsx
import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    fallbackSrc,
    ...rest
}) => {
    const [imgSrc, setImgSrc] = useState<string>(fallbackSrc);

    useEffect(() => {
        setImgSrc(src || fallbackSrc);
    }, [src, fallbackSrc]);

    return (
        <img
            {...rest}
            src={imgSrc}
            onError={() => {
                if (imgSrc !== fallbackSrc) {
                    setImgSrc(fallbackSrc);
                }
            }}
        />
    );
};

export default ImageWithFallback;