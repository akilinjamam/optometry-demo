import React, { useEffect, useState } from 'react';
import paymentSuccess from './PaymentSuccess.module.css';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const [order, setOrder] = useState({});
    const location = useLocation();
    console.log(location);
    console.log(order);

    const query = new URLSearchParams(location.search);

    const transectionId = query.get("transectionId");
    console.log(transectionId);


    useEffect(() => {
        fetch(`https://optometrist-server-46oo.onrender.com/api/v1/payment/${transectionId}`).then(res => res.json()).then(res => setOrder(res));
    }, [transectionId])



    return (
        <div className={paymentSuccess.main}>
            <div className={paymentSuccess.container}>
                <p className='text-center font-bold text-purple-600 text-2xl mt-2'>OPTOMETRIST</p>
                <hr className='mt-4' />
                <p className='text-green-600 text-xl font-bold text-center mt-2'>PAYMENT-SUCCESSFULL</p>
                <br />
                <div className={paymentSuccess.detail}>
                    <p className='font-bold text-sm mb-3'>Payment-Status : {order?.isPaid === true && <span className='text-green-600 italic'>PAID</span>}</p>
                    <p className='font-bold text-sm mb-3'>Transection Id : {order?.tran_id}</p>
                    <p className='font-bold text-sm mb-3'>Name : {order?.cus_name}</p>
                    <p className='font-bold text-sm mb-3'>Email : {order?.cus_email}</p>
                    <p className='font-bold text-sm mb-3'>Address : {order?.cus_add1}</p>
                    <p className='font-bold text-sm mb-3'>City : {order?.cus_city}</p>
                    <p className='font-bold text-sm mb-3'>Country : {order?.cus_country}</p>
                    <p className='font-bold text-sm mb-3'>Postcode : {order?.cus_postcode}</p>
                    <p className='font-bold text-sm mb-3'>Payment-Date : {order?.createdAt?.slice(0, 10)}</p>


                    <div className='flex justify-end items-center print:hidden'>

                        <button className='btn btn-primary mr-5 '><Link to='/'>BACK</Link></button>

                        <button onClick={() => window.print()} className='btn btn-primary '>Print</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;