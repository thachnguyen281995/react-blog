import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { actions } from '../features/useSlice'
import '../styling/blog.css'
const BlogPage = () => {
    const searchInput = useSelector(state => state.user.searchInput)
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=28a90beea1b52e4de5c518a942864352`;
    const dispatch = useDispatch()
    const [blogs,setBlogs] = useState();
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        axios.get(blog_url)
        .then((res) => {
            dispatch(actions.setBlogData(res.data))
            setBlogs(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    },[searchInput])
  return (
    <div className="blog__page">
        <h1 className="blog__page__header">Blogs</h1>
        {loading ? <h1 className='loading'>Loading...</h1> :""}
        <div className="blogs">
            {blogs?.articles.map((blog) => {
                return (
                    <a href={blog.url} className='blog'>
                        <img src={blog.image} alt="" />
                        <div>
                            <h3 className="sourceName">
                                <span>{blog.source.name}</span>
                                <p>{blog.publishedAt}</p>
                            </h3>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                )
            })}
            {blogs?.totalArticles === 0 && (
                <h1 className="no__blogs">
                    No blogs
                </h1>
            )}
        </div>
    </div>
  )
}

export default BlogPage