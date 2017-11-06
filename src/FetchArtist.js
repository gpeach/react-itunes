import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';



class FetchArtist extends React.Component {
  static propTypes = {
    artist: PropTypes.string.isRequired
  }

  state = {
    media: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    
    axios.get('https://itunes.apple.com/search?term=gorgon+city&entity=album&limit=25')
      .then(res => {
        const media = res.data.results;
console.log(media);
        this.setState({
          media,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return (
      <div>
        Something went wrong: {this.state.error.message}
      </div>
    );
  }

  renderMedia() {
    const { error, media } = this.state;

    if(error) {
      return this.renderError();
    }

    return (
      <ul>
        {media.map(media =>
          <li className="inline" key={media.collectionId}>
          <div className="track">
          <a href={media.collectionViewUrl} target="_blank"><div className="title">{media.collectionName}</div></a>
                <div className="artist">{media.artistName}</div>
                <a href={media.collectionViewUrl} target="_blank"><img className="art" alt={media.collectionName} src={media.artworkUrl100}/></a>
                <div className="release">Released: {media.releaseDate} </div>    
          </div>
          </li>
        )}
      </ul>
    );
  }
  

  render() {
    const { artist } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <h1>{`${artist}`}</h1>
        {loading ? this.renderLoading() : this.renderMedia()}
      </div>
    );
  }
}


export default FetchArtist;
