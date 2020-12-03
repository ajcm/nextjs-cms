import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { getPageData, getSortedPostsData } from '../lib/posts';
import Template from '../src/Template';

import {getArticles} from '../src/api/cmsData'


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


//{ posts, home,links}
//   <ReactMarkdown source={home.content} escapeHtml={false} />    
const Page = ({articles}) =>{
  const classes = useStyles();
  return (
    <Template  >
      <React.Fragment>
      <h5> CMS </h5>
      <Articles articles={articles}/>
      </React.Fragment>
    </Template>   
  );
}



const Articles = ({articles}) => {

// /  const articles = getAllArticles()
  // const [articles,setArticles] = React.useState()

  // React.useEffect(() => {
  //   getAllArticles((error,data)=>{
  //     if(error){
  //       throw error
  //     }
  //     setArticles(data)
  //   })
    


  // },[])

  return (
    <React.Fragment>
    <p>Article List...</p>

    <p>
    { articles ? articles.map(a => < Article {...a}/>) : '' }
    </p>
    </React.Fragment>

  )
}


const Article = ({id,title,text}) => {
    return (
      <React.Fragment>
      <h5>{title}</h5>
      <i>{id}</i>
  
      <p>      
        <ReactMarkdown source={text} escapeHtml={false} />   
      </p>
      </React.Fragment>
  
    )
  }


export default Page



/** DATA */
/** ****************************  */

export async function getServerSideProps() {
  // Fetch data from external API
  const articles = await getArticles()
  
  // Pass data to the page via props
  return { props: { articles } }
}