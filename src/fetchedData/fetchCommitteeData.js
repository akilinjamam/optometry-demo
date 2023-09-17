import axios from "axios";



export const fetchGetCommitteeData = async () => {
    const response = await axios.get(`https://optometry-server-demo.vercel.app/api/v1/committee`
    );
    const committeeData = response;
    return committeeData
}

export const fetchGetBlogBySearchData = async (searchValue) => {
    const response = await axios.get(`https://optometry-server-demo.vercel.app/api/v1/committee?searchTerm=${searchValue}`);
    const committeeData = response;
    return committeeData
}

export const fetchPostCommitteeData = async (CommitteeDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometry-server-demo.vercel.app/api/v1/committee/create-committee`, CommitteeDataContainer);
        const committeeData = response;
        refetch();

        return committeeData;
    } catch (error) {


    }
}

export const fetchUpdateCommitteeData = async (idContainer, updateCommitteeDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometry-server-demo.vercel.app/api/v1/committee/${idContainer}`, updateCommitteeDataContainer);
        const committeeData = response;

        refetch();
        return committeeData;
    } catch (error) {

    }
}
export const fetchDeleteCommitteeData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`https://optometry-server-demo.vercel.app/api/v1/committee/${theId}`);
        const committeeData = response;

        refetch()
        return committeeData;
    } catch (error) {

    }
}




