import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NotFoundSvg from "@ui/icons/not-found.svg";

export const NotFoundView = () => {
  return (
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        margin="40px auto"
        maxWidth="md"
      >
          <Typography align="center" color="textPrimary" variant="h2">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box sx={{
                marginTop: 5,
                display: "inline-block",
                width: 'fit-content',
                margin: '0px auto',
          }}>
            <NotFoundSvg style={{transform: 'scale(0.6)'}}/>
          </Box>
      </Box>
  );
};