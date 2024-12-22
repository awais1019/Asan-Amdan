import { createContext,useContext, useEffect, useState } from "react";
import axios from "axios";


const authContext=createContext();

const ServiceProviderAuth=({children})=>{
    const [serviceProviderAuth,setServiceProviderAuth]=useState({
        user:{},
        token:null
    })


    useEffect(() => {
        const getData = async () => {
            try {
                const data =  localStorage.getItem('Token');
                // console.log("it is the token",data);
                if (data) {
                    setServiceProviderAuth({
                        token: data
                    });
                }
            } catch (error) {
                console.log("error gettin data",error)
            }
        }
        getData();
    }, []);

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await axios.post("http://localhost:4000/api/v1/auth/checkServiceProvider", {},
                    {
                        headers: {
                            Authorization: serviceProviderAuth?.token,
                        },
                    });
                    // console.log("it is the response for serviceprovider",response);
                if (response.data.success) {
                    setServiceProviderAuth(
                        {
                            ...serviceProviderAuth,
                            user: response.data.data._id,
                        }
                    )
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log("error occured while checking service provider",error);
                    // localStorage.removeItem('lmsUserData');
                }
            }
        }

        if (serviceProviderAuth?.token) {
            sendRequest();
        }
    }, [serviceProviderAuth?.token]);

    return (
        <authContext.Provider value={{ serviceProviderAuth, setServiceProviderAuth}}>
            {children}
        </authContext.Provider>
    );
}



const useServiceProviderAuth=()=>{
    return useContext(authContext);
}

export {useServiceProviderAuth,ServiceProviderAuth};