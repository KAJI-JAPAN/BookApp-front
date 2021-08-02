import noImage from '~/assets/images/noImage.png'

export default ({ app }, inject) => {
  inject('title', value => value.volumeInfo.title ? value.volumeInfo.title : 'No title')
  inject('author', value => value.volumeInfo.authors ? value.volumeInfo.authors[0] : 'No authors')
  inject('image', value => value.volumeInfo.imageLinks ? value.volumeInfo.imageLinks.thumbnail : noImage)
}
