import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {getLessonOne} from '@redux/actions';
import {useParams} from "react-router-dom";
import {formatDate, formatTime} from '@utils/timeHelp';
import { OneLessonTable } from '@src/components/OneLessonTable';
import {Preloader} from '@src/components/Preloader';
import {BackPageArrow} from '@src/components/BackPageArrow';

export const OneLesson = () => {
    const dispatch = useDispatch();
    let { mongoLessonId } = useParams();
	const {id: mongoTeacherId} = useSelector((state) => state.teacher);
    useEffect(() => {
        dispatch(getLessonOne({mongoTeacherId, mongoLessonId}))
    }, []);
    const {
        isLoad,
        gameType,
        gameTime,
        classId, 
        className,
        oneStudentLessonList,
        productiveInfo } = useSelector((state) => state.lessonOne);
    if(isLoad || !classId) {
        return (<Preloader/>)
    }
    let numberStudent = 0;
    let timeAllSudent = 0;
    const rowsCurrent = oneStudentLessonList.map(({name, idBracelet, avatar, answer}) => {
        const infoAnswer = {numberCorrect: 0, allTime: 0, numberQuestion: 0}
        answer.forEach(({correct, timeNeeded}) => {
            infoAnswer.numberQuestion +=1;
            infoAnswer.allTime += Number(timeNeeded);
            if(correct) infoAnswer.numberCorrect +=1;
        })
        if (infoAnswer.numberQuestion !== 0) {
            numberStudent +=1;
            timeAllSudent += infoAnswer.allTime/infoAnswer.numberQuestion;
            return {
                idBracelet,
                nameStudent: name,
                avatar: avatar ? avatar : null,
                correctPercent: infoAnswer.numberCorrect/infoAnswer.numberQuestion,
                averageStudent: (infoAnswer.allTime/infoAnswer.numberQuestion).toFixed(0),
                deviationStudent: infoAnswer.allTime/infoAnswer.numberQuestion,
                numberQuestion: infoAnswer.numberQuestion,
                answer: answer,
            }
        } else {
            return {
                idBracelet,
                nameStudent: name,
                avatar: avatar ? avatar : null,
                correctPercent: 0,
                averageStudent: 0,
                deviationStudent: 0,
                numberQuestion: 0,
                answer: answer,
            }
        }
    })
    const openInfoList = {};
    const rows = rowsCurrent.map((item) => {
        const average = (item.deviationStudent - timeAllSudent/numberStudent)/(timeAllSudent/numberStudent)*100;
        openInfoList[item.idBracelet] = false;
        return {...item, deviationStudent: average.toFixed(0),}
    })
    return (
        <Box
            sx={{display: 'flex',
                flexDirection: 'column',
                margin: '70px auto',
                maxWidth: 'md'
            }}            
        >
            <BackPageArrow/>
            <Box
                sx={{display: 'flex', m: 'auto', borderBottom: 1, mb: 2}}            
            >
                <Box sx={{display: 'flex', alignItems: 'baseline', mr: 2}}>
                    <Typography
                        variant="h5"
                        sx={{mr: 1.5}}
                    >
                        Date:
                    </Typography>
                    <Typography
                        variant="h3"
                    >
                        {formatDate(new Date(gameTime))}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'baseline', mr: 2}}>
                    <Typography
                        variant="h5"
                        sx={{mr: 1.5}}
                    >
                        Class:
                    </Typography>
                    <Typography
                        variant="h3"
                    >
                        {className}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                    <Typography
                        variant="h5"
                        sx={{mr: 1.5}}
                    >
                        Game:
                    </Typography>
                    <Typography
                        variant="h3"
                    >
                        {gameType}
                    </Typography>
                </Box>
            </Box>
            <OneLessonTable rows={rows} productiveInfo={productiveInfo} openInfoList={openInfoList}/>
        </Box>
    )
}