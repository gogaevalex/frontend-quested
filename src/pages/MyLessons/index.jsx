import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState} from "react";
import Box from '@mui/material/Box';
import {FilterLessons} from './components/FilterLessons';
import {TableLessons} from './components/TableLessons'; 
import {getLessonList} from '@redux/actions';
import {Preloader} from '@src/components/Preloader';

export const MyLessons = () => {
    const [filterResult, setFilterResult] = useState(null);
    const dispatch = useDispatch();
	const {id: mongoTeacherId} = useSelector((state) => state.teacher);
    useEffect(() => {
        dispatch(getLessonList({mongoTeacherId}))
    }, []);
    const {isLoad, list, filter} = useSelector((state) => state.lessonList);

    if(isLoad || !list) {
        return (<Preloader/>)
    }
    const rows = []
    list.forEach(({className, gameTime, gameType, mongoLessonId, productiveInfo}) => {
        if (filterResult) {
            if (filterResult.startData <= gameTime && filterResult.finishData >= gameTime) {
                if (filterResult.className === 'none' || filterResult.className === className) {
                    if (filterResult.gameType === 'none' || filterResult.gameType === gameType) {
                        rows.push({
                            mongoLessonId,
                            className,
                            gameTime,
                            gameType,
                            percentCorrect: productiveInfo.numberCorrect/productiveInfo.numberQuestion,
                            devinationTime: productiveInfo.allTimeNedded/productiveInfo.numberQuestion,
                            numberQuestion: productiveInfo.numberQuestion,
                        })
                    }
                }
            }
        } else {
            rows.push({
                mongoLessonId,
                className,
                gameTime,
                gameType,
                percentCorrect: productiveInfo.numberCorrect/productiveInfo.numberQuestion,
                devinationTime: productiveInfo.allTimeNedded/productiveInfo.numberQuestion,
                numberQuestion: productiveInfo.numberQuestion,
            })
        }
    })

    const changeFilter = (startData, finishData, className, gameType) => {
        setFilterResult({
            startData: startData,
            finishData: finishData,
            className: className,
            gameType: gameType,
        })
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
            <FilterLessons filter={filter} changeFilter={changeFilter} />
            <TableLessons rows={rows} />
        </Box>
    )
}
