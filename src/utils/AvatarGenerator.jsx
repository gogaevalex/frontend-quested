import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const AvatarGenerator = ({avatar, width, height, name}) => {
    const colors = [
        '#cc4c4c',
        '#E2A957',
        '#6806a5',
        '#06631A',
        '#246CAF',
        '#62AC40',
        '#a38b33',
        '#6B47D2',
        '#9461B4',
        '#AC4040',
        '#B6E257',
        '#efc5c5',
        '#b47676',
        '#DC7B21',
        '#857085',
    ];
    
    return (
        <Box
            sx={{
                background: colors[avatar],
                borderRadius: '100%',
                width: width,
                height: height,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
            }}
        >
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h4"
            >
                {name[0]}
            </Typography>

        </Box>
    )
}