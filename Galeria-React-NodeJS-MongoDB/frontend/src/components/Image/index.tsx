import React from 'react';
import LazyLoad from 'react-lazyload';
import { ImageStyled } from './styles';

export default function Image({ src }) {

    const path = `https://galeriabackendnode-production.up.railway.app/${src}`

    return (
            <ImageStyled src={path} alt="Image" loading="lazy"/>
    )
}