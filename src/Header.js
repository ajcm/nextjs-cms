import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
  toolbarA: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: '10px',
    paddingTop: '10px',
    minHeight: '0px'
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,   
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    borderBottom: `1px solid ${theme.palette.divider}`,
    
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbarA}>      
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}



export default Header;
