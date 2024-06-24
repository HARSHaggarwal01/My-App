import axios from 'axios';
import { baseUrl, Slider ,getAllCategories ,popularProducts ,getProducts ,getbrand,trendingProduct,productDetails} from '../components/Common/Common'; 

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

export const getAllCategory = async (category_id = null) => {
    
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}${getAllCategories}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if(category_id !== null){
      options.url = `${baseUrl}${getAllCategories}?category_id=${category_id.toString()}`;
    }

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

export const getTrendingProduct = async () => {
    
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}${trendingProduct}`,
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

export const getAllProducts = async (category_id = null, brand_id = null, types = []) => {
  try {
    let url = `${baseUrl}${getProducts}`;
    const params = new URLSearchParams();

    if (category_id) params.append('category_id', category_id);
    if (brand_id) params.append('brand_id', brand_id);
    if (types.length > 0) params.append('types', types.join(','));

    if (params.toString()) {
      url = `${url}?${params.toString()}`;
    }

    const options = {
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.request(options);
    const { error, data } = response.data;

    if (!error) {
      return data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const brand = async () => {
    
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}${getbrand}`,
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

export const productDetail = async (slug, variantAttributeId = []) => {
  try {
    console.log(variantAttributeId);
    const options = {
      method: 'GET',
      url: `${baseUrl}${productDetails}?slug=${slug}&variantAttributeId[]=[${variantAttributeId}]`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    
    const response = await axios.request(options);
    const responseData = response.data;
    const { error, result } = responseData;

    if (!error) {
      return result;
    } else {
      throw new Error('Error fetching product details');
    }
  } catch (error) {
    console.error('Error in productDetail API:', error);
    throw error; // Throw the error to handle it in the calling function
  }
};