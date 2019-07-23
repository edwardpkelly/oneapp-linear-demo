import media from '../model/media';

// Return a copy - no mutating original media Object!!!
const findBrandData = (brand) => {
    const item = media.find(obj => obj.data === brand);
    // spread will not perform a deep copy
    // so spread the params Object here and add it back
    const { ...params } = item;

    const data = {
        ...item,
        params
    };
    return data;
};

export default findBrandData;