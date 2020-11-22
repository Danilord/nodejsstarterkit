const axios = require('axios').default
const _ = require('lodash')

const byId = async (req, res) => {
  //http://www.omdbapi.com/?apikey=a197c9a&i=tt0372784


  try {
    const id = req.query.id 

    if(!id) {
      throw ('ID is required')
    }

    const response = await axios.get(`http://www.omdbapi.com/?apikey=a197c9a&i=${id}`)

    return res.status(200).json(response.data )
  } catch (e) {
    return res.status(500).send(`Error on Movie controller ${e}`)
  }
}

const search = async (req, res) => {
  //http://www.omdbapi.com/?apikey=a197c9a&i=tt0372784


  try {

    const term = req.query.value
    
    const page = req.query.page || 1


    let url = ''
    
    if(!term) {
      throw ('Term search is required')
    }


    const response = await axios.get(`http://www.omdbapi.com/?apikey=a197c9a&s=${term}&page=${page}`)
    
    let data = _.sortBy(response.data.Search, ['Year'])

    data = data.map(movie => { return{...movie, info: `http://localhost:3060/byId?id${movie.id}`}})

    if(page !== 1) {
      return res.status(200).json(data.splice(0,2) )
    }

    return res.status(200).json(data )
  } catch (e) {
    return res.status(500).send(`Error on Movie controller ${e}`)
  }
}

module.exports = { byId, search }
