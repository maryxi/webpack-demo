// require('./main.css')
// require('./main.scss')
// let $ = require('jquery')
// let sub = require('./sub')

import './main.scss'
import sub from './sub'
// import $ from 'jquery'

let app = document.createElement('div')
app.innerHTML = '<h1>hello world by mxc~!~</h1>'
app.appendChild(sub())
document.body.appendChild(app)
$('body').append('<h3>boy</h3>')