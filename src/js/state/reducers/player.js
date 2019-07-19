import PlayerConstants from '../../constants/player-constants';

const player = (state = {}, action) => {
    switch (action.type) {
        case PlayerConstants.ON_MEDIA_ITEM_UPDATED: {
            const { data } = action;
            const { 
                data: brand,
                callsign,
                cpc_config,
                requestor
            } = data;
            return {
                ...state,
                currentMediaItem: {
                    brand,
                    callsign,
                    cpc_config,
                    requestor
                }
            }
        }
    }
    return state;
};

export default player;