import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return (
        <div>
            <MuiAlert elevation={6} variant="filled" {...props} />;
        </div>
    )
}

export default Alert
