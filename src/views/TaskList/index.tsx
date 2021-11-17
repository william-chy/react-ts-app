import React, { useState, useEffect } from 'react';
import { getTodo, addTodo, deleteTodo } from '../../apis';
import { Link } from 'react-router-dom';
import './index.scss';

interface TaskItemProps {
  className?: string;
  title?: string;
  id: number;
}

const TaskItem = (props: TaskItemProps) => {
  return (
    <div className={'menu-badge ' + props.className}>
      <label htmlFor={'task' + props.id} className="form-checkbox">
        <input type="checkbox" name={'task' + props.id} id={'task' + props.id} />
        <i className="form-icon" /> <Link to={`/detail?id=${props.id}`}>{props.title}</Link>
      </label>
    </div>
  );
};

interface TaskFormProps {
  addFn: Function;
}
const TaskForm = (props: TaskFormProps) => {
  const [ taskTitle, setTaskTitle ] = useState('');
  return (
    <div className="input-group input-inline">
      <input
        className="form-input input-sm"
        type="text"
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />
      <button
        onClick={() => props.addFn({ name: taskTitle }, setTaskTitle)}
        className="btn btn-primary btn-sm input-group-btn"
      >
        添加任务
      </button>
    </div>
  );
};

export interface Task {
  name?: string;
  detail?: string;
  id: number;
}

const List = () => {
  //useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  const [ taskList, setTaskList ] = useState([] as Task[]);
  //useEffect(effect: EffectCallback, deps?: DependencyList): void;
  let didCancel = false;
  useEffect(() => {
    fetchData();
    return () => {
      didCancel = true;
    };
  }, []);
  const fetchData = async () => {
    try {
      const res = await getTodo({ page: 1, pageSize: 100 });
      console.log('res', res, didCancel, Object.prototype.toString.call(res.data.list));
      if (!didCancel && Array.isArray(res.data.list)) {
        const todoList = res.data.list.filter((task: any) => (task.name = task.task_name) && !task.is_done);
        setTaskList(todoList);
      }
    } catch (error) {
      console.error('error', error);
      if (!didCancel) {
        setTaskList([]);
      }
    }
  };
  const addTask = async (task: Task, setTaskTitle: Function) => {
    const res = await addTodo({ ...task, task_name: task.name });
    if (res.code && res.code !== 200) return alert(res.msg);
    task.id = res.data.id;
    taskList.push(task);
    setTaskList([ ...taskList ]);
    setTaskTitle('');
  };
  const delTask = async (task: Task) => {
    const res = await deleteTodo({ id: task.id });
    if (res.data) {
      fetchData();
    }
  };
  return (
    <React.Fragment>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            <h1>待办事项</h1> <Link to="/">back</Link>
          </div>
        </div>
        <div className="panel-nav" />
        <div className="panel-body container">
          {taskList.map((item, index) => (
            <div key={item.id} className="flex-left">
              <TaskItem title={item.name} id={item.id} />
              <i className=" icon icon-delete ml-2 text-primary c-hand" onClick={() => delTask(item)} />
            </div>
          ))}
        </div>
        <div className="panel-footer">
          <TaskForm addFn={addTask} />
        </div>
      </div>
    </React.Fragment>
  );
};
export default List;
