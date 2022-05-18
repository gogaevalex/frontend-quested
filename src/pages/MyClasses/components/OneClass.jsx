import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, {useState} from "react";

import { TableClassPerfomance } from "@src/components/TableClassPerfomance";

export const OneClass = ({mongoClassId, className, studentList, filter}) => {
    const [gameFilter, setGameFilter] = useState('none');

    const [subjectFilter, setSubjectFilter] = useState('none');
    const [subjectFilterList, setSubjectFilterList] = useState([]);

    const [topicFilter, setTopicFilter] = useState('none');
    const [topicFilterList, setTopicFilterList] = useState([]);


    let numberStudent = 0;
    let timeAllSudent = 0;
    const rowsCurrent = studentList.map(({name, idBracelet, oneStudentLessonList, avatar}) => {
        const infoAnswer = {numberCorrect: 0, allTime: 0, numberQuestion: 0}
        oneStudentLessonList.forEach(({answer, gameType}) => {
            if (gameType === gameFilter || gameFilter === 'none') {
                answer.forEach(({correct, timeNeeded, question}) => {
                    if (question.subject === subjectFilter || subjectFilter === 'none' ) {
                        if(question.topic === topicFilter || topicFilter === 'none') {
                            infoAnswer.numberQuestion +=1;
                            infoAnswer.allTime += Number(timeNeeded);
                            if(correct) infoAnswer.numberCorrect +=1;
                        }
                    }
                })
            }
        })
        if (infoAnswer.numberQuestion !== 0) {
            numberStudent +=1;
            timeAllSudent += infoAnswer.allTime/infoAnswer.numberQuestion;
            return {
                idBracelet,
                nameStudent: name,
                avatar: avatar ? avatar : null,
                correctPercent: infoAnswer.numberCorrect/infoAnswer.numberQuestion,
                averageStudent: (infoAnswer.allTime/infoAnswer.numberQuestion).toFixed(2),
                deviationStudent: infoAnswer.allTime/infoAnswer.numberQuestion,
                numberQuestion: infoAnswer.numberQuestion,
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
            }
        }
    })
    const rows = rowsCurrent.map((item) => {
        const average = (item.deviationStudent - timeAllSudent/numberStudent)/(timeAllSudent/numberStudent)*100;
        return {...item, deviationStudent: average.toFixed(0),}
    })
    const gameFilterList = filter.map(({gameType}) => gameType);
    const handleChangeGameFilter = (event) => {
        const newValue = event.target.value;
        setGameFilter(newValue);
        if (newValue !== 'none') {
            const {subjectList} = filter.find(({gameType}) => gameType === newValue);
            const resultSubjectList = subjectList.map(({subject}) => subject);
            setSubjectFilterList(resultSubjectList);
        }
        setSubjectFilter('none');
        setTopicFilter('none');
    };

    const handleChangeSubjectFilter = (event) => {
        const newValue = event.target.value;
        setSubjectFilter(event.target.value);
        if (newValue !== 'none') {
            const {subjectList} = filter.find(({gameType}) => gameType === gameFilter);
            const {topicList} = subjectList.find(({subject}) => subject === newValue);
            setTopicFilterList(topicList);
        }
        setTopicFilter('none');
    }

    const handleChangeTopicFilter = (event) => {
        setTopicFilter(event.target.value);
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
            <Box sx={{ mt: 3, mb: 3, display: 'flex' }}>
                <FormControl fullWidth sx={{ mr: 3, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-label">Game</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gameFilter}
                        label="Game"
                        onChange={handleChangeGameFilter}
                    >
                        <MenuItem value='none' >None</MenuItem>
                        {gameFilterList.map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth disabled={gameFilter === 'none'} sx={{ mr: 3, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={subjectFilter}
                        label="Subject"
                        onChange={handleChangeSubjectFilter}
                    >
                        <MenuItem value='none' >None</MenuItem>
                        {subjectFilterList.map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth disabled={subjectFilter === 'none' || gameFilter === 'none'} sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={topicFilter}
                        label="Topic"
                        onChange={handleChangeTopicFilter}
                    >
                        <MenuItem value='none' >None</MenuItem>
                        {topicFilterList.map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <TableClassPerfomance rows={rows} classTitle={className} mongoClassId={mongoClassId}/>
        </Box>
    )
}