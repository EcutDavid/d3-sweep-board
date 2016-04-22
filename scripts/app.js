import d3 from 'd3'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './home.scss'


const containerDom = document.querySelector('#app')
const colors = d3.scale.category10()

const data = {
  todo: [
    'datavis',
    'prepare speak',
  ],
  done: [
    'checking stack overflow',
    'QA #111',
  ]
}
const mockData =[
  [1, 2],
  [3, 4],
]
class Board extends Component {
  componentDidMount() {
    const groups =  d3.select(containerDom).append('svg')
      .selectAll('g')
      .data(mockData)
      .enter()
      .append('g')
      .style('transform', (_, i) => `translate(${100 + 90 * i}px, 50px)`)[0]

    mockData.forEach((d, i) => {
      const card = d3.select(groups[i])
        .selectAll('g')
        .data(mockData[i])
        .enter()
        .append('g')

      card.append('rect').style({
        width: '50px',
        height: '30px',
        fill: colors(i),
        transform: (_, ind) => `translate(0, ${ 50 * ind }px)`,
      })

      card.append('text').style(
          'transform', (_, ind) => `translate(10px, ${ 50 * ind + 20}px)`,
        )
        .text(d => d)
    })
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}


ReactDOM.render(<Board />, containerDom)
