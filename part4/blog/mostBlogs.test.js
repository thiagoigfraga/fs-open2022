const mostBlogs = require('./utils/list_helper').mostBlogs

describe('Most Blogs', () => {
  test('author with most blogs returns:', () => {

    const blogs = [

      {
        author: 'Robert C. Martin',
        blogs: 3
      },
      {
        author: 'Jorge X',
        blogs: 7
      },
      {
        author: 'Pablo S',
        blogs: 15
      },
      {
        author: 'Yale A',
        blogs: 30
      },
      {
        author: 'Max P',
        blogs: 4
      },

    ]

    const result = mostBlogs(blogs)

    expect(result).toEqual({
      author: 'Yale A',
      blogs: 30
    })

  })
})