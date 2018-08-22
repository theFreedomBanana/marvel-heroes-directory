// @flow
import React, { Component } from "react"
import InfiniteScroll from "react-infinite-scroller"
import HeroThumbnail from "./heroThumbnail"
import Loader from "../utilities/loader"


type State = {
  heroes: Array<Object>,
  offset: number,
  listComplete: boolean,
};


class HeroesList extends Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      heroes: [],
      offset: 0,
      listComplete: false,
    }
  }

  fetchHeroes(offset: number = 0) {
    const url = "https://gateway.marvel.com:443/v1/public/characters"
    const apiKey = "6c3b02b3371becf9e0a3b670e224e35a"

    fetch(`${url}?apikey=${apiKey}&offset=${offset}`)
      .then( res => (
        res.json()
      ))
      .then( res => {
        this.setState( (prevState, prevProps) => ({
          heroes: prevState.heroes.concat(res.data.results),
          offset: res.data.offset + res.data.count,
          listComplete: (res.data.offset + res.data.count) === res.data.total ? true : false,
        }))
      })
  }


  render() {
    const { heroes, offset, listComplete } = this.state

    return(
      <div>
        <InfiniteScroll
          loadMore={ () => this.fetchHeroes(offset) }
          hasMore={!listComplete}
          loader={
            <div className="loader" key="sheild-loader">
              <Loader></Loader>
            </div>
          }
          threshold={500}
          useWindow={true}
        >
          <ul className="container">
            { heroes.map( hero => <HeroThumbnail key={hero.id} hero={hero}></HeroThumbnail> )}
          </ul>
        </InfiniteScroll>
      </div>
    )
  }
}

export default HeroesList
