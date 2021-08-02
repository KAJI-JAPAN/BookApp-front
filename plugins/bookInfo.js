// import Vue from 'vue'
import noImage from '~/assets/images/noImage.png'

// Vue.prototype.$title = value => value.volumeInfo.title ? value.volumeInfo.title : 'No title'
// Vue.prototype.$author = value => value.volumeInfo.authors ? value.volumeInfo.authors[0] : 'No authors'
// Vue.prototype.$title = value => value.volumeInfo.imageLinks ? value.volumeInfo.imageLinks.thumbnail : noImage

// export default {
//   methods: {
//     title: valu => valu.volumeInfo.title ? valu.volumeInfo.title : 'No title',
//     author: valu => valu.volumeInfo.authors ? valu.volumeInfo.authors[0] : 'No authors',
//     image: valu => valu.volumeInfo.imageLinks ? valu.volumeInfo.imageLinks.thumbnail : noImage
//   }
// }

export default ({ app }, inject) => {
  inject('title', value => value.volumeInfo.title ? value.volumeInfo.title : 'No title')
  inject('author', value => value.volumeInfo.authors ? value.volumeInfo.authors[0] : 'No authors')
  inject('image', value => value.volumeInfo.imageLinks ? value.volumeInfo.imageLinks.thumbnail : noImage)
}
