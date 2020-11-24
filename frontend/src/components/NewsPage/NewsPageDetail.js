
import './NewsDetailPage.css';

function NewsPageDetail(props) {
  const news = props.props;
  
  return (
    <div className="news-wrapper">
      <h1 className="news-headlines">{news.headline}</h1>
      <a href={`${news.url}`}>
        <img src={`${news.image}`} width="60%" height="20%" alt={`${news.headline}`} />
      </a>
    </div>
  )
}

export default NewsPageDetail;