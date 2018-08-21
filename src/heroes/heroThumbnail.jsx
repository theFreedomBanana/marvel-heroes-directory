// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { FaLink } from "react-icons/fa"
import "./heroThumbnail.css"


type Props = {
  hero: {
    id: number,
    name: string,
    thumbnail: {
      path: string,
      extension: string,
    },
    urls: Array<{
      type: string,
      url: string,
    }>
  },
};


class HeroThumbnail extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const {hero} = this.props

    return(
      <li className="col-sm-12 col-lg-4">
        <div className="hero-thumbnail-container">
          <Link to={`/characters/${hero.id}`}>
            <div className="overlay"></div>
            <div className="thumbnail-img-container">
              <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} />
            </div>
          </Link>
          <div className="thumbnail-infos-container">
            <Link to={`/characters/${hero.id}`}><h4>{hero.name}</h4></Link>
            <div className="links-container">
              { hero.urls[0] ? <a href={hero.urls[0].url} target="_blank"><FaLink />details</a> : null }
              { hero.urls[1] ? <a href={hero.urls[1].url} target="_blank"><FaLink />wiki</a> : null }
              { hero.urls[2] ? <a href={hero.urls[2].url} target="_blank"><FaLink />comiclink</a> : null }
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default HeroThumbnail
