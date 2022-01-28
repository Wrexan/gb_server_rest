import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            repo_link: '',
            involved_users: [],
            is_active: true
        }
        // console.log(props.users)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = (target.name === 'is_active' ? target.checked : target.value);
        switch (name) {
            case 'is_active': this.setState({is_active: target.checked}); break
            case 'involved_users': this.setState({involved_users: Number(value)}); break
            default: this.setState({[event.target.name]: event.target.value}); break
        }
        // console.log(this.state)
    }

    handleSubmit(event) {
        // console.log(this.state.name)
        // console.log(this.state.repo_link)
        // console.log(this.state.involved_users)
        console.log(this.state.name, this.state.repo_link, this.state.involved_users, this.state.is_active)
        this.props.createItem(this.state.name, this.state.repo_link, this.state.involved_users, this.state.is_active)
        event.preventDefault()
    }

    // userList(users) {
    //     console.log(this.users)
    //     const ids = users.id
    //     return (
    //         <ul>
    //             {ids.map((id) =>
    //                 <li key={id.toString()}
    //                 value={users.username} />
    //             )}
    //         </ul>
    //     )
        // const sidebar = (
        //     <ul>
        //         {users.map((user) =>
        //             <li key={user.id}>
        //                 {user.username}
        //             </li>
        //         )}
        //     </ul>
        // );
    // }

    render() {
        return (
            <div className="win bgd">
                <form className="msg" onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="txtb">
                        {/*<label for="login">name</label>*/}
                        <input className="txtb" type="text" name="name" placeholder="Назване" value={this.state.name}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <p/>
                    <div className="txtb">
                        {/*<label for="login">name</label>*/}
                        <input className="txtb" type="text" name="repo_link" placeholder="Репозиторий"
                               value={this.state.repo_link}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <p/>
                    <div>
                        {/*<label className="txtb" for="author">author</label>*/}
                        {/*<input className="txtb" type="number" name="involved_users" placeholder="Участники"*/}
                        {/*       value={this.state.involved_users}*/}
                        {/*       onChange={(event) => this.handleChange(event)}/>*/}
                        <select multiple name="involved_users" className="txtb w300 h600"
                                onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                        </select>
                    </div>
                    <p/>
                    <div>
                        {/*<label className="txtb" for="author">author</label>*/}
                        {/*<select className="txtb"  onChange={this.handleChange}>*/}
                        {/*    <option selected value="true">Активен</option>*/}
                        {/*    <option value="false">Закрыт</option>*/}
                        {/*</select>*/}
                        <label className="txtb" for="is_active">Активен </label>
                        <input
                            name="is_active"
                            type="checkbox"
                            checked={this.state.is_active}
                            onChange={this.handleChange}/>
                        {/*<input className="txtb" type="bool" name="is_active" placeholder="Активен"*/}
                        {/*       value={this.state.is_active}*/}
                        {/*       onChange={(event) => this.handleChange(event)}/>*/}
                    </div>
                    <p/>
                    <input className="txtb" type="submit" value="Save"/>
                </form>
            </div>
        )
    }
}

export default ProjectForm