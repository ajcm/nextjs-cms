import { makeStyles } from '@material-ui/core/styles';
import { getPageFiles } from 'next/dist/next-server/server/get-page-files';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { getArticles, getItem } from '../src/api/cmsData';
import Template from '../src/Template';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


//{ posts, home,links}
   
const Page = ({posts,page}) =>{
  const classes = useStyles();
  return (
    <Template posts={posts} sidebar={posts} >
       <ReactMarkdown source={page.text} escapeHtml={false} />  
    </Template>   
  );
}


export default Page



/** DATA */
// /** ****************************  */
// export async function getStaticProps() {

//   const posts = getSortedPostsData()
//   const home = await getPageData('home')
//   const sidebar = await getPageData('sidebar')
//  // const pageData = await getPageData('home')

//   return {
//     props: {
//       posts,
//       home, 
//       sidebar
//     }
//   }
// }

export async function getServerSideProps() {
  // Fetch data from external API
  const posts = await getArticles()
  const page = await getItem('PAGE','page-0')
  
  // Pass data to the page via props
  return { props: { posts,page } }
}