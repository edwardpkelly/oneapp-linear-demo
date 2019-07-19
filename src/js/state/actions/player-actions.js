import PlayerConstants from '../../constants/player-constants';

export const onMediaItemUpdated = data => ({
    type: PlayerConstants.ON_MEDIA_ITEM_UPDATED,
    data
});