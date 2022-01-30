import axios from 'axios'
import Books from

jest.mock('axios')

test('', () => {
  const book = [{ title: 'test' }]
  const resp = [{ data: book }]
  axios.get.mockResolvedValue(resp)

  return Books.all().then(data => expect(data).toEqual(book))
})
