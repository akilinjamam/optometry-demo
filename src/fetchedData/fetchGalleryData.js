import axios from "axios";

export const fetchGetGalleryData = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/gallery`);
    const galleryData = response;
    return galleryData
}

export const fetchGetGalleryBySearchData = async (searchTerm) => {
    const response = await axios.get(`http://localhost:5000/api/v1/gallery?searchTerm=${searchTerm}`);
    const galleryData = response;
    return galleryData
}

export const fetchPostGalleryData = async (galleryDataContainer, refetch) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/gallery/create-gallery`, galleryDataContainer);
        const galleryData = response;
        refetch();
        return galleryData;
    } catch (error) {

    }
}

export const fetchUpdateGalleryData = async (idContainer, updategalleryDataContainer, refetch) => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/v1/gallery/${idContainer}`, updategalleryDataContainer);
        const galleryData = response;
        refetch();
        return galleryData;
    } catch (error) {

    }
}

export const fetchDeleteGalleryData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/v1/gallery/${theId}`);
        const galleryData = response;
        refetch()
        return galleryData;
    } catch (error) {

    }
}




