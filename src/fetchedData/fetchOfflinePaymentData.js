import axios from "axios";



export const fetchGetOfflinePaymentData = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/offline-payment`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('oab-access-token')}`
        }
    }
    );
    const offlinePaymentData = response;
    return offlinePaymentData
}

export const fetchPostOfflinePaymentData = async (OfflinePaymentDataContainer, refetch) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/offline-payment/create-offlinePayment`, OfflinePaymentDataContainer);
        const offlinePaymentData = response;
        refetch();

        return offlinePaymentData;
    } catch (error) {


    }
}

export const fetchUpdateOfflinePaymentData = async (idContainer, updateOfflinePaymentDataContainer, refetch) => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/v1/offline-payment/${idContainer}`, updateOfflinePaymentDataContainer);
        const offlinePaymentData = response;

        refetch();
        return offlinePaymentData;
    } catch (error) {

    }
}
export const fetchDeleteOfflinePaymentData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/v1/offline-payment/${theId}`);
        const offlinePaymentData = response;

        refetch()
        return offlinePaymentData;
    } catch (error) {

    }
}




