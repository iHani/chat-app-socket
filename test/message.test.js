var expect = require('expect')

var {generateMEssage} = require('../server/utils/message')

describe('generateMEssage', () => {
  it('should generate correct message object', () => {

    var from = "Jen"
    var text = "Hello from Jen"
    var message = generateMEssage(from, text)

    expect(50).toBeA('number')
    expect(message).toInclude({from, text})

  })
})
