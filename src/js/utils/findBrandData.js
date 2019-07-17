import media from '../model/media';

const findBrandData = (brand) => {
    return media.find(obj => obj.data === brand);
};

export default findBrandData;