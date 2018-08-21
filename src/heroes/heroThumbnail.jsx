// @flow
import React, { Component } from "react"
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
        <div className="heroThumbnailContainer">
          <div className="thumbnailImgContainer">
            <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} />
          </div>
          <div className="thumbnailDetailsContainer">
            <h4>{hero.name}</h4>
            { hero.urls[0] ? <a href={hero.urls[0].url} target="_blank">details</a> : null }
            { hero.urls[1] ? <a href={hero.urls[1].url} target="_blank">wiki</a> : null }
            { hero.urls[2] ? <a href={hero.urls[2].url} target="_blank">comiclink</a> : null }
          </div>
        </div>
      </li>
    )
  }
}

export default HeroThumbnail
