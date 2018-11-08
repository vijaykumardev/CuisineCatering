import Api from '@/services/Api'

export default {
  index (cart) {
    return Api().get('cart', {
      params: cart
    })
  },
  post (cart) {
    return Api().post('cart', cart)
  },
  delete (cartId) {
    return Api().delete(`cart/${cartId}`)
  },
  put (status) {
    return Api().put(`cart/${status}`, status)
  }
}
