import * as React from 'react';
import Button from '@mui/joy/Button';


const SavedJoke = ({handleClick}:any) => {
    return (
        <Button size="md" onClick={handleClick}
            sx={{
            backgroundColor: '#EDC9AF',
            color: 'black',
            minWidth: '108px'
            }}>
            Save
        </Button>
    )
}

export default SavedJoke;