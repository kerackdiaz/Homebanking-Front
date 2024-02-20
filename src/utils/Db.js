import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:8080/api/clients/";

export const useDbClient = (id) => {
    const [client, setClient] = useState([]);
    useEffect(() => {
        axios.get(`${baseURL}${id}`)
        .then(response => {
            setClient(response.data);
        })
        .catch(error => {
            console.error('Error fetching accounts:', error);
        });
    }, [id]);
    return client;
}

export const postLogin = async (loginData) => {
    try {
      const response = await axios.post(`${baseURL}login`, loginData);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }  