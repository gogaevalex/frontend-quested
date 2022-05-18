import React, {useState} from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export const FilterStudent = ({filter, changeFilter}) => {
    const minData = Math.min(filter.gameTimeList);
    const maxData = Math.max(filter.gameTimeList);
    const [startData, setStartData] = useState(minData);
    const [finishData, setFinishData] = useState(maxData);

    const [className, setClassName] = useState('none');
    const [gameType, setGameType] = useState('none');

    return (
        <Box maxWidth="mb"
            sx={{
                display: 'flex',
                padding: '0 40px 0 40px',
                alignItems: 'center',
                minWidth: "xs",
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3} direction="row" >
                    <DesktopDatePicker
                        label="Start data"
                        inputFormat="MM/dd/yyyy"
                        minDate={minData}
                        maxDate={finishData}
                        value={startData}
                        onChange={(newValue) => setStartData(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                        label="Finish data"
                        inputFormat="MM/dd/yyyy"
                        minDate={startData}
                        maxDate={maxData}
                        value={finishData}
                        onChange={(newValue) => setFinishData(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
            <Box sx={{ mt: 3, mb: 3, display: 'flex' }}>
                <FormControl fullWidth sx={{ mr: 3, ml: 3, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={className}
                        label="Class"
                        onChange={(e) => setClassName(e.target.value)}
                    >
                        <MenuItem value='none' >None</MenuItem>
                        {filter.classNameList.map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{minWidth: 120, mr: 3 }}>
                    <InputLabel id="demo-simple-select-label">Game type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gameType}
                        label="GameTyP"
                        onChange={(e) => setGameType(e.target.value)}
                    >
                        <MenuItem value='none' >None</MenuItem>
                        {filter.gameTypeList.map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Button variant="outlined" onClick={() => changeFilter(startData, finishData, className, gameType)} >
                Filter
            </Button>
        </Box>
    )
}
