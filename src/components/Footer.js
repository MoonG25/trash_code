import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => {
  return {
    footer: {
      backgroundColor: '#fff',
    },
    copyRight: {
      padding: theme.spacing(1),
      '& p': {
        fontWeight: '600',
        fontSize: '12px',
        color: 'rgba(189, 189, 189, 0.87);',
      },
    },
  };
});

export default function Footer(props) {
  const classes = styles();

  return (
    <div className={classes.footer}>
      <div className={classes.divider}>
        {/* <Divider /> */}
      </div>

      <div align="center" className={classes.copyRight}>
        <Typography color="textSecondary">2020 © AETHER IT CO., Ltd. All rights reserved.</Typography>
      </div>
    </div>
  );
}