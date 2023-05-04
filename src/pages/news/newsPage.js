import './newsPage.css'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { useState , useEffect} from 'react'
import axios from 'axios'
function NewsPage(){


    const [newsDB, setnewsDB ] =useState()

    useEffect(()=>{
        axios.get('https://newsdata.io/api/1/news?apikey=pub_20589bb6e7946018a8101cfc194d92803d065&q=covid&country=in&language=en&category=health')
          .then(response => {
            setnewsDB(response.data.results)
          })
          .catch(error =>{
            console.log(error)
          });

    },[])
    console.log(newsDB)
    return(
        <div className="news-wrapper">
            <Header/>
            {
                newsDB?
                <div className="news-details">
                    <h1>NEWS</h1>
                    <div className='my-published-section'>
                    {newsDB.map((data,i)=>
                        <div className="news-item" key={i}>
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                        </div>
                    )}
                    </div>
                </div>
                : "LOADING"
            }
            <Footer/>

        </div>
    )
}

export default NewsPage