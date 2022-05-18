import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {statisticStudent} from '@redux/actions';
import {useParams} from "react-router-dom";
import {formatDate, formatTime} from '@utils/timeHelp';
import {Preloader} from '@src/components/Preloader';
import {FilterStudent} from './components/FilterStudent';
import {TableStudent} from './components/TableStudent';
import {AvatarGenerator} from '@utils/AvatarGenerator';
import {BackPageArrow} from '@src/components/BackPageArrow';

export const OneStudent = () => {
    const [filterResult, setFilterResult] = useState(null);
    const dispatch = useDispatch();
    let { idBracelet } = useParams();
	const {id: mongoTeacherId} = useSelector((state) => state.teacher);
    useEffect(() => {
        dispatch(statisticStudent({mongoTeacherId, idBracelet}))
    }, []);
    const {isLoad, oneStudent} = useSelector((state) => state.statistic);
    if(isLoad || !oneStudent) {
        return (<Preloader/>)
    }
    const rows = [];
    oneStudent.list.forEach(({className, gameTime, gameType, productiveInfo, answerList, mongoLessonId}) => {
        if (filterResult) {
            if (filterResult.startData <= gameTime && filterResult.finishData >= gameTime) {
                if (filterResult.className === 'none' || filterResult.className === className) {
                    if (filterResult.gameType === 'none' || filterResult.gameType === gameType) {
                        rows.push({
                            answer: answerList,
                            className,
                            mongoLessonId,
                            gameTime,
                            gameType,
                            correctPercent: productiveInfo.numberCorrect/productiveInfo.numberQuestion,
                            averageTime: productiveInfo.allTimeNedded/productiveInfo.numberQuestion,
                            numberQuestion: productiveInfo.numberQuestion,
                        })
                    }
                }
            }
        } else {
            rows.push({
                answer: answerList,
                className,
                mongoLessonId,
                gameTime,
                gameType,
                correctPercent: productiveInfo.numberCorrect/productiveInfo.numberQuestion,
                averageTime: productiveInfo.allTimeNedded/productiveInfo.numberQuestion,
                numberQuestion: productiveInfo.numberQuestion,
            })
        }
    })

    const openInfoList = {};
    rows.forEach((item) => {
        openInfoList[item.mongoLessonId] = false;
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper',
                mt: 5,
                margin: '70px auto',
                padding: '0 40px',
                maxWidth: "md",
            }}
        >
            <BackPageArrow/>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <AvatarGenerator 
                    avatar={oneStudent.avatar}
                    width="40px"
                    height="40px"
                    name={oneStudent.name }
                />
                <Typography
                    component="span"
                    variant="h4"
                    ml={3}
                >
                    {oneStudent.name}
                </Typography>
            </Box>
            <FilterStudent filter={oneStudent.filterList} changeFilter={changeFilter} />
            <TableStudent rows={rows} openInfoList={openInfoList}/>
        </Box>
    )
}