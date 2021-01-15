var path = require('path')
var express = require('express')
var app = express()
var fs = require('fs')

var ora = require('ora')
var chalk = require('chalk')

var spinner = ora('start serer ...')
spinner.start()

app.use(express.static(path.join(__dirname, './dist/')))

app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname, '../favicon.ico'))
})

app.get('/health', function (req, res) {
    res.json({ status: 'UP', name: '中台客户管理系统' })
})

app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/'))
})

app.listen(5000, function () {
    spinner.stop()
    console.log(chalk.yellow('server start successful. port is 5000\n'))
})
