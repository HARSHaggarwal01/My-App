import axios from 'axios';
import { baseUrl, Slider ,getAllCategories ,popularProducts } from '../components/Common/Common'; 

const token = "null";
export const getSlider = async () => {
    
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}${Slider}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.request(options); 
    const responseData = response.data; 
    const { error, data } = responseData;

    if(error === false){
        return data; 
    }
    return null ;

  } catch (err) {
    console.error('Error during API request:', err);
    return null; 
  }
};

export const getAllCategory = async () => {
    
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}${getAllCategories}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.request(options); 
    const responseData = response.data; 
    const { error, data } = responseData;

    if(error === false){
        return data; 
    }
    return null ;

  } catch (err) {
    console.error('Error during API request:', err);
    return null; 
  }
};

export const getPopularProducts = async () => {
    
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}${popularProducts}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    const response = await axios.request(options); 
    const responseData = response.data; 
    const { error, data } = responseData;

    if(error === false){
        return data; 
    }
    return null ;

  } catch (err) {
    console.error('Error during API request:', err);
    return null; 
  }
};
