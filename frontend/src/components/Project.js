import {Link, useParams} from "react-router-dom";
import React from "react";
let filter = []

function activity(obj) {
    if (obj.is_active === true) {return 'Активен'} else {return 'Закрыт'}
}

const handleChange = (event, projs, deleteItem) => {
        const target = event.target;
        // let filter = target.value
        // console.log(target.value)
        filter = projs.filter(elem => elem.name.toLowerCase().indexOf(target.value.toLowerCase()) !== -1)
        console.log(filter)
        console.log(projs)
        // ProjectList({filter, deleteItem})
        // const name = target.name;
        // const value = (target.name === 'is_active' ? target.checked : target.value);
        // switch (name) {
        //     case 'is_active': this.setState({is_active: target.checked}); break
        //     case 'involved_users':
        //         if(target.selectedOptions){
        //             let users = []
        //             for (let i=0; i<target.selectedOptions.length; i++){
        //                 users.push(parseInt(target.selectedOptions.item(i).value))
        //             }
        //             this.setState({involved_users: users});
        //         } break
        //     default: this.setState({[event.target.name]: event.target.value}); break
        // }
        // console.log(this.state)
    }

const Project = ({proj, todo}) => {
    let users = proj.involved_users
    return (
        <table className="win bgd w">
            <thead>
            <tr>
                <th>Название</th>
                <th>Участники</th>
                <th>Заметки</th>
                <th>Управление</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{proj.name}</td>
                <td>
                    {users.map((proj) => <li>{proj.username}</li>)}
                </td>
                <td>{todo.map((proj) => <li title={proj.task}>{proj.name}</li>)}</td>
                <td>
                    {activity(proj)}
                    {/*<button type='button'>{activity(proj)}</button>*/}
                    {/*<button onClick={()=>deleteProject(proj.id)} type='button'>Удалить</button>*/}
                </td>
            </tr>
            </tbody>
        </table>
    )
}

const ProjectItem = ({proj, deleteItem}) => {
    return (
        <tr>
            <td><Link to={`/project/${proj.id}`}>{proj.name}</Link></td>
            <td>{proj.repo_link}</td>
            <td>
                {activity(proj)}
                {/*<button type='button'>{activity(proj)}</button>*/}
            </td>
            <td>
                <button onClick={() => deleteItem(proj.id)} type='button'>Удалить</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projs, deleteItem}) => {
    return (
        <div>
            <table className="win bgd w">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Репозиторий</th>
                    <th>Состояние</th>
                    <th>Управление</th>
                </tr>
                </thead>
                <tbody>
                    {projs.map((proj) => <ProjectItem proj={proj} deleteItem={deleteItem}/>)}
                </tbody>

            </table>
            <nav>
                <div className="menu r w bgd">
                    <li><input className="txtb" type="text" placeholder="Найти"
                               onChange={(event) => handleChange(event)}/></li>
                    <li><Link to='/projects/create'>Создать</Link></li>
                </div>
            </nav>
        </div>
    )
}
const ProjectPage = ({projs, todos, deleteItem}) => {
    let {id} = useParams()
    if (projs.length === 0) {
        return <div/>
    }
    id = parseInt(id)
    if (id) {
        let proj = projs.find(x => x.id === id)
        let todo = todos.filter(x => x.related_project.id === id)
        return Project({proj, todo, deleteItem})
    } else {
        // if(filter.length > 0){
        //     console.log('got filter', filter)
        //     return ProjectList({projs, deleteItem})
        // }
        return ProjectList({projs, deleteItem})
    }
}


export default ProjectPage