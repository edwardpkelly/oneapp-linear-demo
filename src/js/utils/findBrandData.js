import BRAND_VALUES from '../constants/brand-values';

const findBrandData = (brand) => {
    return BRAND_VALUES.find(obj => obj.data === brand);
};

export default findBrandData;