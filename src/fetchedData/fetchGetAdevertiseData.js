import axios from "axios";



const fetchGetAdvertiseData = async () => {
    const response = await axios.get(`https://optometry-server-demo.vercel.app/api/v1/advertise`);
    const advertiseData = response;
    return advertiseData;
}

export default fetchGetAdvertiseData;