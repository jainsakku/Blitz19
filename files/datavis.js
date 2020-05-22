import html from './datavis.html'
document.getElementById('seeStats').addEventListener('click', visualizeData)
function visualizeData(e) {
    let val = document.querySelector('select').value
    document.getElementById('options').classList.add('no-display')
    document.getElementById('loader').classList.remove('no-display')
fetch(`/${val}`).then(res => res.json())
.then(res => {
    document.getElementById('loader').classList.add('no-display')
    if (!res.ok) {
        document.getElementById('error').classList.remove('no-display')
    } else {
        document.getElementById('barchart').classList.remove('no-display')
        createChart({data: res.data, society: val})
        res.data.forEach(el => {
            document.getElementById('content')
            .appendChild(createRow(el))
        })
    }
    // let height = document.getElementById('barchart').clientHeight
    // let width = document.getElementById('barchart').clientWidth
})
}

function createRow ({name, value}) {
    let wrap = document.createElement('div')
    wrap.classList.add('row')
    let heading = createWrappedText('h2', name)
    heading.classList.add('row__head')
    wrap.appendChild(heading)
    let cardContainer = document.createElement('div')
    cardContainer.classList.add('row__cards')
    value.forEach(el => {
        cardContainer.appendChild(createCard(el))
    })
    wrap.appendChild(cardContainer)
    return wrap
}

function createCard(item) {
    let card = document.createElement('div')
    card.classList.add('card')
    let name = createWrappedText('p', item.firstName + ' ' + item.lastName)
    name.classList.add('card__name')
    let email = createWrappedText('p', item.email)
    email.classList.add('card__email')
    let mob = createWrappedText('p', item.mob)
    mob.classList.add('card__mob')
    let blitzID = createWrappedText('p', `blitz@${item.blitzID}`)
    blitzID.classList.add('card__blitzID')
    let teamName = createWrappedText('p', `Team Name: ${item.teamName}`)
    teamName.classList.add('card__teamName')
    let teamSize = createWrappedText('p', `Team Size: ${item.teamSize}`)
    teamSize.classList.add('card__teamSize')
    card.appendChild(name)
    card.appendChild(email)
    card.appendChild(mob)
    card.appendChild(blitzID)
    item.teamName && card.appendChild(teamName)
    item.teamSize && card.appendChild(teamSize)
    return card
}

function createWrappedText(elem, txt) {
    let wrap = document.createElement(elem)
    wrap.appendChild(document.createTextNode(txt))
    return wrap
}

function createChart({data, society}) {
    const svg = d3.select('svg');
    const svgContainer = d3.select('#container');
    
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
    .range([0, width])
    .domain(data.map(el => el.name))
    .padding(0.4)
    
    const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, Math.max(...data.map(el => el.value.length))]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisLeft()
    .scale(yScale)

    chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

    chart.append('g')
    .call(d3.axisLeft(yScale));

    chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
    )

    const barGroups = chart.selectAll()
    .data(data)
    .enter()
    .append('g')

    barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(g.name))
    .attr('y', (g) => yScale(g.value.length))
    .attr('height', (g) => height - yScale(g.value.length))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function (actual, i) {
        d3.select(this)
        .transition()
        .duration(300)

        const y = yScale(actual.value.length)

        line = chart.append('line')
        .attr('id', 'limit')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', width)
        .attr('y2', y)
    })
    .on('mouseleave', function () {
        d3.selectAll('.value')
        .attr('opacity', 1)

        d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 1)
        .attr('x', (a) => xScale(a.name))
        .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
    })

    barGroups 
    .append('text')
    .attr('class', 'value')
    .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
    .attr('y', (a) => yScale(a.value.length + 0.1))
    .attr('text-anchor', 'middle')
    .text((a) => `${a.value.length}`)
    
    svg
    .append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Registrations')

    svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Events')

    svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text(`${society}`)

    svg.append('text')
    .attr('class', 'source')
    .attr('x', width - margin / 2)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'start')
    .text(`Last updated: ${new Date().toLocaleString()}`)
}