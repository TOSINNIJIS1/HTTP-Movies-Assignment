import React from 'react';
import axios from 'axios'

class Form extends React.Component {

    state = {
        data : {
            title: '',
            director: '',
            metascore: '',
            stars: []
    }
}

    componentDidMount = () => {
        axios.get(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                data: res.data
            })
        })
    }

    

    onSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${this.props.match.params.id}`, this.state)
        .then(res => {
            console.log('data', res)
            this.setState({
                ...this.state
            })
            this.props.history.push('/')
            
        
        })
        .catch(err => console.log('error', err))
    }

    handleChange = e => {
        this.setState({
            ...this.state.data, [e.target.name]: e.target.value
        })
    }


    handleStar = e => {
        this.setState({
            ...this.state.data, stars: e.target.value.split(',')
        })
    }



    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <label> Title: </label>
                <input type="text" name='title' value={this.state.data.title} onChange={this.handleChange}
                />
                
                <label> Director: </label>
                <input type="text" name='director' value={this.state.data.director} onChange={this.handleChange}
                />

                <label> Metascore: </label>
                <input type="text" name='metascore' value={this.state.data.metascore} onChange={this.handleChange}
                />

                <label> Stars: </label>
                <input type="text" name='stars' value={this.state.data.stars} onChange={this.handleStar}
                />

                
                <button> update </button>

                
            </form>
        )
    }
}

export default Form