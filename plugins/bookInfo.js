import noImage from '~/assets/images/noImage.png'
export default {
  methods: {
    title: valu => valu.volumeInfo.title ? valu.volumeInfo.title : 'No title',
    authors: valu => valu.volumeInfo.authors ? valu.volumeInfo.authors[0] : 'No authors',
    image: valu => valu.volumeInfo.imageLinks ? valu.volumeInfo.imageLinks.thumbnail : noImage
  }
}
