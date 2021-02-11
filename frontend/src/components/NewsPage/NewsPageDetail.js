
import './NewsDetailPage.css';

function NewsPageDetail(props) {
  const news = props.props;

  return (
    <div className="news-wrapper">
      <a href={`${news.url}`} target="_blank" referrer="none">
      <h1 className="news-headlines">{news.headline}</h1>
        <img src={`${news.image}`} className="img__news-image" width="80%" height="20%" alt={`${news.headline}`} />
      </a>
    </div>
  )
}

export default NewsPageDetail;
