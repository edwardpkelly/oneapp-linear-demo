import React from 'react';
import { connect } from 'react-redux';

const InfoHeadline = props => {
    const {
        callsign,
        displayName
    } = props;

    let headlineClass = 'display-6';
    if (displayName == '') headlineClass += ' now-watching-header-hidden';

    let headlineMsg = `Now Watching: ${displayName}`;
    if (callsign && callsign.label != '') headlineMsg += ` (${callsign.label})`;

    return (
        <h3 className={headlineClass}>{headlineMsg}</h3>
    )
};

const mapStateToProps = state => ({
    displayName: state.player.currentMediaItem.displayName,
    callsign: state.player.currentMediaItem.callsignData
});

export default connect(mapStateToProps)(InfoHeadline);