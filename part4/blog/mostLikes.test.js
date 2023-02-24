const mostLikes = require('./utils/list_helper').mostLikes

describe('Most Likes:', () => {
  test('most likes blog returns:', () => {
    const blogs = [
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      },
      {
        author: 'Mark A',
        likes: 23
      },
      {
        author: 'Douglas Z',
        likes: 80
      },
      { author: 'Frank D. Ocean',
        likes: 4
      }
    ]

    const result = mostLikes(blogs)

    expect(result).toEqual({
      author: 'Douglas Z',
      likes: 80
    })
  })
})