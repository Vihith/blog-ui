import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class UserShow extends React.Component {
    constructor(props){
        super(props)
        this.state={
            user:{},
            posts:[]
        }
    }

    componentDidMount(){
        const id= this.props.match.params.id
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
            const user = response.data
            this.setState(() => ({user}))
        })

        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response => {
                const posts = response.data 
                this.setState(() => ({ posts: posts }))
            })
    }

    render(){
        return(
            <div>
                <h2>{this.state.user.name}</h2>
                <p>Email {this.state.user.email}</p>
                <p>{this.state.user.body}</p>

                <ul>
                    {this.state.posts.map(post => <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                        {post.title}
                        </Link></li>)}
                </ul>
            </div>
        )
    }
}

export default UserShow