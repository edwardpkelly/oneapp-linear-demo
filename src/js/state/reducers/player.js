import PlayerConstants from '../../constants/player-constants';

const player = (state = {}, action) => {
    switch (action.type) {
        case PlayerConstants.ON_MEDIA_ITEM_UPDATED: {
            const { data } = action;
            const { 
                data: brand,
                callsign,
                cpc_config,
                displayName,
                requestor
            } = data;
            
            let callsignData = {label: '', data: ''};
            if (callsign.hasOwnProperty('label') && callsign.hasOwnProperty('data')) {
                callsignData = {
                    ...callsign
                };
            }

            return {
                ...state,
                currentMediaItem: {
                    brand,
                    callsignData,
                    cpc_config,
                    displayName,
                    requestor
                }
            }
        }
    }
    return state;
};

export default player;