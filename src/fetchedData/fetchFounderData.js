import axios from "axios";



export const fetchGetFounderData = async () => {
    const response = await axios.get(`https://optometry-server-demo.vercel.app/api/v1/founder`
    );
    const founderData = response;
    return founderData
}

export const fetchGetBlogBySearchData = async (searchValue) => {
    const response = await axios.get(`https://optometry-server-demo.vercel.app/api/v1/founder?searchTerm=${searchValue}`);
    const founderData = response;
    return founderData
}

export const fetchPostFounderData = async (FounderDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometry-server-demo.vercel.app/api/v1/founder/create-founder`, FounderDataContainer);
        const founderData = response;
        refetch();

        return founderData;
    } catch (error) {


    }
}

export const fetchUpdateFounderData = async (idContainer, updateFounderDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometry-server-demo.vercel.app/api/v1/founder/${idContainer}`, updateFounderDataContainer);
        const founderData = response;

        refetch();
        return founderData;
    } catch (error) {

    }
}
export const fetchDeleteFounderData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`https://optometry-server-demo.vercel.app/api/v1/founder/${theId}`);
        const founderData = response;

        refetch()
        return founderData;
    } catch (error) {

    }
}




