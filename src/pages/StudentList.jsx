import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState} from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {getClassOne} from '@redux/actions';
import {useParams} from "react-router-dom";
import { IconButton } from '@mui/material';
import {Preloader} from '@src/components/Preloader';
import {BackPageArrow} from '@src/components/BackPageArrow';
import {AvatarGenerator} from '@utils/AvatarGenerator';
import { useHistory } from "react-router-dom";

export const StudentList = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    let { mongoClassId } = useParams();
	const {id: mongoTeacherId} = useSelector((state) => state.teacher);
    useEffect(() => {
        dispatch(getClassOne({mongoTeacherId, mongoClassId}))
    }, []);
    const {isLoad, classId, className, studentList} = useSelector((state) => state.classOne);
    if(isLoad || !classId) {
        return (<Preloader/>)
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper',
                margin: '70px auto',
                padding: '0 40px 0 40px',
                maxWidth: 'md',
            }}
        >
            <BackPageArrow/>
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h3"
            >
                {className}
            </Typography>

            <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                {studentList.map(({name, idBracelet, avatar, isRegistered}) => (
                    <Box key={idBracelet}>

                        <ListItem alignItems="center" sx={{padding: '0px 0px 5px 0px'}}>
                            <ListItemAvatar>
                                {avatar ?
                                    <IconButton
                                        sx={{
                                            mr: 2,
                                        }}
                                        onClick={() => history.push(`/student/${idBracelet}`)}
                                    >
                                        <AvatarGenerator 
                                            avatar={avatar}
                                            width="40px"
                                            height="40px"
                                            name={name}
                                        />
                                    </IconButton>
                                : null}
                            </ListItemAvatar>
                            <ListItemText
                                primary={name}
                                sx={{mt: '12px'}}
                                secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color={isRegistered ? 'green' : 'red'}
                                    >
                                        {isRegistered ? 'is password' : 'not password'}
                                    </Typography>
                                </React.Fragment>
                                }
                            />
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                {idBracelet}
                            </Typography>
                            <Button variant="outlined" sx={{width: 200, ml: 7}} disabled={!isRegistered}>Delete password</Button>
                        </ListItem>
                        <Divider variant="fullWidth" component="li" />
                    </Box>
                ))}
            </List>
        </Box>
    )
}
