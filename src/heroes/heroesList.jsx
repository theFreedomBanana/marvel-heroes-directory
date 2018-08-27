// @flow
import React, { Component } from "react"
import InfiniteScroll from "react-infinite-scroller"
import HeroThumbnail from "./heroThumbnail"
import Loader from "../utilities/loader"
import { fetchData } from "../services/httpRequests.js"


type Props = {
  data: Object,
  fetchData: Function,
}

type State = {
  heroes: Array<Object>,
  listComplete: boolean,
  offset: number,
};


class HeroesList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      heroes: [],
      listComplete: false,
      offset: 0,
    }
  }

  updateHeroesList(offset: number = 0, limit: number = 21) {
    const URL = "https://gateway.marvel.com:443/v1/public/characters"

    fetchData({
      url: URL,
      queryParams: {offset, limit},
    })
      .then( res => {
        this.setState( (prevState, prevProps) => ({
          heroes: prevState.heroes.concat(res.data.results),
          offset: res.data.offset + res.data.count,
          listComplete: (res.data.offset + res.data.count) === res.data.total ? true : false,
        }))
      })
  }


  render() {
    const { heroes, offset } = this.state

    return(
      <div>
        { heroes
          ?
          <InfiniteScroll
            loadMore={ () => this.updateHeroesList(offset) }
            hasMore={!this.state.listComplete}
            loader={
              <div className="loader" key="sheild-loader">
                <Loader></Loader>
              </div>
            }
            threshold={250}
            useWindow={true}>
            <ul className="container">
              { heroes.map( hero => <HeroThumbnail key={hero.id} hero={hero}></HeroThumbnail> )}
            </ul>
          </InfiniteScroll>
          :
          null
        }
      </div>
    )
  }
}

export default HeroesList
