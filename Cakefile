{print} = require 'util'
{spawn} = require 'child_process'

build = (callback) ->
  coffee = spawn 'coffee', ['-c', '-o', 'lib', 'src']
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()
  coffee.on 'exit', (code) ->
    callback?() if code is 0

task 'build', 'Build lib/ from src/', ->
  build()

task 'test', 'Run tests', ->
  build ->
    process.chdir __dirname
    {reporters} = require 'nodeunit'
    reporters.default.run ['test']

task 'cafebuild', 'test compiled source', ->
    build()
    stitch = require './lib/stitch'
    fs = require 'fs'

    p = stitch.createPackage(
        paths:['../stitch_test/coffee']
    )

    p.compile (err, source) ->
        fs.writeFile(
            '../stitch_test/public/result.js'
            source
            (err) ->
                if err
                    console.log 'failed to harvest'
                else
                    console.log 'done'
        )

