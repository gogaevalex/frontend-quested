import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect} from "react";
import Box from '@mui/material/Box';

import {getClassList} from '@redux/actions';
import {OneClass} from './components/OneClass';
import {Preloader} from '@src/components/Preloader';

export const MyClasses = () => {
    const dispatch = useDispatch();
	const {id: mongoTeacherId} = useSelector((state) => state.teacher);
    useEffect(() => {
        dispatch(getClassList({mongoTeacherId}))
    }, []);
    const {isLoad, list} = useSelector((state) => state.classList);

    if(isLoad || !list) {
        return (<Preloader />)
    }
    return (
        <Box maxWidth="mb"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper',
                mt: 5,
                padding: '0 40px 0 40px',
                minWidth: "xs",
            }}
        >
            {list.map(({mongoClassId, className, studentList, filter}) => (
                <OneClass key={mongoClassId} mongoClassId={mongoClassId} className={className} studentList={studentList} filter={filter}/>
            ))}
        </Box>
    )
}
