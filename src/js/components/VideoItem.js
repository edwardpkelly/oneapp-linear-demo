import React from 'react';

const VideoItem = props => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="card mb-4 shadow-sm">
                <img className="card-img-top" src="images/bravo_tv.png" alt="Bravo" />
                <div className="card-body">
                    <button id="watch-bravo-west-btn" onclick="loadBravo(CALLSIGN_CONSTANTS.WEST);"
                        type="button" className="btn btn-lg btn-block btn-primary btn-watch-now">Sign-in to
                                Watch</button>
                    <button id="watch-bravo-east-btn" onclick="loadBravo(CALLSIGN_CONSTANTS.EAST);"
                        type="button" className="btn btn-lg btn-block btn-primary btn-watch-now">Sign-in to
                                Watch</button>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;