import axios from 'axios'

const baseUrl = 'http://localhost:7000'

const getAllToDo = (setToDo)=>{
    axios
    .get(baseUrl)
    .then(({data})=>{
        console.log('data =>',data)
    })
}

export {getAllToDo}