import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { getArticles, getItemByGuid } from '../../src/api/cmsData';
import Template from '../../src/Template'

import utilStyles from '../../styles/utils.module.css'


// <Date dateString={postData.date} />
const Page = ({posts,post}) =>{

  return (
    <Template posts={posts}  >
      <h2>{post.title}</h2>
      <div className={utilStyles.lightText}>
      ({new Date(post.metadata.ctime).toLocaleDateString()})
      </div>
      <ReactMarkdown source={post.text} escapeHtml={false} />   
    </Template>   
  );
}


export default Page



/** DATA */
/** ****************************  */

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const posts = await getArticles()
  const post = await getItemByGuid(params.id)
  
  // Pass data to the page via props
  return { props: { posts,post } }
}