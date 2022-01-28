import {Link, useParams} from "react-router-dom";

function activity(obj) {
    if (obj.is_active === true) {
        return 'Активен'
    } else {
        return 'Закрыт'
    }
}

const Project = ({proj, todo}) => {
    let users = proj.involved_users
    return (
        <table className="win bgd">
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
                <td>{proj.name} ({activity(proj)})</td>
                <td>
                    {users.map((proj) => <li>{proj.username}</li>)}
                </td>
                <td>{todo.map((proj) => <li title={proj.task}>{proj.name}</li>)}</td>
                <td>
                    <button type='button'>{activity(proj)}</button>
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
                <button type='button'>{activity(proj)}</button>
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
                    <li><Link to='/projects/create'>Создать</Link></li>
                </div>
            </nav>
        </div>
    )
}
const ProjectPage = ({projs, todos, deleteItem}) => {
    // console.log('1:', typeof(projs), projs)
    // console.log('2:', typeof(todos), todos)
    let {id} = useParams()
    if (projs.length === 0) {
        return <div/>
    }
    id = parseInt(id)
    if (id) {
        let proj = projs.find(x => x.id === id)
        let todo = todos.filter(x => x.related_project.id === id)
        // console.log('3:', projs, id, typeof(proj), proj)
        // console.log('4:', typeof(todo), todo, todo.author)
        return Project({proj, todo, deleteItem})
    } else {
        return ProjectList({projs, deleteItem})
    }
}


export default ProjectPage