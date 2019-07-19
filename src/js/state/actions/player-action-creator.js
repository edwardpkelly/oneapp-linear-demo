import PlayerConstants from '../../constants/player-constants';
import { onMediaItemUpdated } from '../actions/player-actions';

const playerActionCreator = store => {
    const handlePlayerEvents = event => {
        switch (event.type) {
            case PlayerConstants.ON_MEDIA_ITEM_UPDATED: {
                const { eventObject } = event;
                const { currentMediaItem } = eventObject;
                store.dispatch(onMediaItemUpdated(currentMediaItem));
                break;
            }
        }
    };

    $(document).on(PlayerConstants.ON_MEDIA_ITEM_UPDATED, handlePlayerEvents);
};


export {
    playerActionCreator
};