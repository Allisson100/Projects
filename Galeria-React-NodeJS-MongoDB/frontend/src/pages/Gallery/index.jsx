import { useEffect, useState } from "react";
import { getImagesDbGallery } from "../../store/reducers/imagesFromDB";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../components/Image";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { GalleryContainer } from "./styes";

export default function Gallery() {
  const dispatch = useDispatch();

  const imagesDB = useSelector((state) => state.imagesDB);
  const [renderableImages, setRenderableImages] = useState([]);

  useEffect(() => {
    dispatch(getImagesDbGallery());
  }, [dispatch]);

  useEffect(() => {
    const checkImageExists = async (src) => {
      try {
        const response = await fetch(src);
        return response.ok;
      } catch (error) {
        return false;
      }
    };

    const filterRenderableImages = async () => {
      const renderableImages = await Promise.all(
        imagesDB.map(async (image) => {
          const exists = await checkImageExists(
            `https://galeriabackendnode-production.up.railway.app/${image.src}`
          );
          if (exists) {
            return image;
          } else {
            return null;
          }
        })
      );
      setRenderableImages(renderableImages.filter(Boolean));
    };

    filterRenderableImages();

    checkImageExists();
  }, [imagesDB]);

  return (
    <GalleryContainer>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="15px">
          {renderableImages.map((image) => (
            <Image key={image._id} src={image.src} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </GalleryContainer>
  );
}
