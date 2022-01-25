import {Link, useParams} from "react-router-dom";

function activity(obj){
    if (obj.is_active === true){return 'Активен'}else{return 'Закрыт'}
}
const Project = ({proj, todo, deleteProject}) => {
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
                    <td><button type='button'>{activity(proj)}</button>
                        {/*<button onClick={()=>deleteProject(proj.id)} type='button'>Удалить</button>*/}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

const ProjectItem = ({proj, deleteProject}) => {
    return (
        <tr>
            <td><Link to={`/project/${proj.id}`}>{proj.name}</Link></td>
            <td>{proj.repo_link}</td>
            <td><button type='button'>{activity(proj)}</button></td>
            <td><button onClick={()=>deleteProject(proj.id)} type='button'>Удалить</button></td>
        </tr>
    )
}

const ProjectList = ({projs, deleteProject}) => {
    return (
    <table className="win bgd">
        <thead>
            <tr>
                <th>Название</th>
                <th>Репозиторий</th>
                <th>Состояние</th>
                <th>Управление</th>
            </tr>
        </thead>
        <tbody>
            {projs.map((proj) => <ProjectItem proj={proj} deleteProject={deleteProject}/>)}
        </tbody>
    </table>
)
}
const ProjectPage = ({projs, todos, deleteProject}) => {
    // console.log('1:', typeof(projs), projs)
    // console.log('2:', typeof(todos), todos)
    let { id } = useParams()
    if (projs.length === 0){return <div/>}
    id = parseInt(id)
    if (id){
        let proj = projs.find(x => x.id === id)
        let todo = todos.filter(x => x.related_project.id === id)
        // console.log('3:', projs, id, typeof(proj), proj)
        // console.log('4:', typeof(todo), todo, todo.author)
        return Project({proj, todo, deleteProject})
    }else{
        return ProjectList({projs, deleteProject})
    }
}


export default ProjectPage