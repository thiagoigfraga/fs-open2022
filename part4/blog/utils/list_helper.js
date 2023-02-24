// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {

  return 1

}

const totalLikes = (blogs) => {

  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {

  const maxLikesPost = Math.max(...blogs.map((e => e.likes)))

  return blogs.find(e => e.likes === maxLikesPost)

}

const mostBlogs = (blogs) => {

  const mostBlogsQuantity = Math.max(...blogs.map(e => e.blogs))

  return blogs.find(e => e.blogs === mostBlogsQuantity)

}

const mostLikes = (blogs) => {

  const mostLikesQuantity = Math.max(...blogs.map(e => e.likes))

  return blogs.find(e => e.likes === mostLikesQuantity)
}



module.exports = { dummy,totalLikes,favoriteBlog, mostBlogs, mostLikes }