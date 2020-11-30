
import './NewsDetailPage.css';

function NewsPageDetail(props) {
  const news = props.props;
  
  return (
    <div className="news-wrapper">
      <a href={`${news.url}`}>
      <h1 className="news-headlines">{news.headline}</h1>
        <img src={`${news.image}`} width="60%" height="20%" alt={`${news.headline}`} />
      </a>
    </div>
  )
}

export default NewsPageDetail;