import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('cuisines', {
      params: {
        search: search
      }
    })
  },
  show (cuisineId) {
    return Api().get(`cuisine/${cuisineId}`)
  },
  post (cuisine) {
    return Api().post('cuisines', cuisine)
  },
  put (cuisine) {
    return Api().put(`cuisine/${cuisine.id}`, cuisine)
  }
}
