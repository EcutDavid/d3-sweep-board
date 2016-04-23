import d3 from 'd3'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './home.scss'


const containerDom = document.querySelector('#app')
const colors = d3.scale.category10()

const drag = d3.behavior.drag()
    .origin(d => d)
    .on("drag", dragmove);

function dragmove() {
  const x = d3.event.x
  console.log(x)
  d3.select(this)
    .style('transform', `translate(${d3.event.x}px, ${d3.event.y}px)`)
}

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
//That is the reason why we need put x, y here
//https://stackoverflow.com/questions/13657687/drag-behavior-returning-nan-in-d3
const mockData =[
  [{ text: 1, x: 0, y: 0 }, { text: 2, x: 0, y: 50 }],
  [{ text: 3, x: 0, y: 0 }, { text: 4, x: 0, y: 50 }],
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
        .attr("x", function(d,i){console.log(d)})
        .style('transform', d => `translate(0, ${d.y}px)`)
        .call(drag)

      card.append('rect').style({
        width: '50px',
        height: '30px',
        fill: colors(i),
      })

      card.append('text').style(
          'transform', (_, ind) => `translate(10px, 20px)`,
        )
        .text(d => d.text)
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
