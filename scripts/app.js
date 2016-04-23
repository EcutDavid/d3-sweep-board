import d3 from 'd3'
import _ from 'lodash'

import './home.scss'


const containerDom = document.querySelector('#app')
const colors = d3.scale.category10()

const drag = d3.behavior.drag()
    .origin(d => {return { x: d.x, y: d.y }})
    .on('drag', dragmove)

function dragmove(d) {
  const { x, y } = d3.event
  d.x = x
  d.y = y
  d3.select(this)
    .style('transform', `translate(${x}px, ${y}px)`)
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
const parsedData = _.map(data, (d, i) => {
  return { name: i, points: d.map((dd, ii) => {
    return { text: dd, x: 0, y: 50 * ii}
  })}
})

const groups =  d3.select(containerDom).append('svg')
  .selectAll('g')
  .data(parsedData)
  .enter()
  .append('g')
  .style('transform', (d, i) => `translate(${100 + 90 * i}px, 50px)`)[0]

parsedData.forEach((d, i) => {
  const card = d3.select(groups[i])
    .selectAll('g')
    .data(parsedData[i].points)
    .enter()
    .append('g')
    .style('transform', dd => `translate(0, ${dd.y}px)`)
    .call(drag)

  card.append('rect').style({
    width: '50px',
    height: '30px',
    fill: colors(i),
  })

  card.append('text').text(dd => dd.text)
    .style('transform', (ddd, ind) => `translate(10px, 20px)`)
})
