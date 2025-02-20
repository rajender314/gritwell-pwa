import React from 'react';
import {Alert, Snackbar} from '@mui/material';

type Props = {
appearance: string | any;
message: string;
open: boolean;
close: () => void;
title?: string;
};
const CommonSnackbar = (props: Props) => {
  return (
    <>
      <Snackbar
        open={props.open}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={props.close}
      >
        <Alert severity={props.appearance}>
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default CommonSnackbar;
