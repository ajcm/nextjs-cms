import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
}));


const SideBar = ({posts,sidebar}) => {
  const classes = useStyles();

return (

  <React.Fragment>
   { /* 
  <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
    Links
  </Typography>
  <ReactMarkdown source={sidebar.content} escapeHtml={false} />
   */}
  <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
    Articles
  </Typography>
  
  
  {posts ? posts.map((post) => (
    <p  key={post.id}>
    <Link
      display="block"
      variant="body2"
      href={'/posts/'+post.id}
     
    >
      <i>({new Date(post.metadata.ctime).toLocaleDateString()})</i> - {post.title}
    </Link>

 
    </p>
  )) : ''}

  </React.Fragment>)

}

export default SideBar;
