import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

interface TaskItemProps {
  title?: string;
  id: number;
}

const TaskItem = (props: TaskItemProps) => {
  return (
    <div className="menu-badge">
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
      <button onClick={() => props.addFn(taskTitle)} className="btn btn-primary btn-sm input-group-btn">
        添加任务
      </button>
    </div>
  );
};
const List = () => {
  //useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  const [ taskList, settaskList ] = useState([] as string[]);
  //useEffect(effect: EffectCallback, deps?: DependencyList): void;
  useEffect(() => {
    settaskList([ '学习react' ]);
    return () => {};
  }, []);
  const addTask = (task: string) => {
    taskList.push(task);
    settaskList([ ...taskList ]);
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
        <div className="panel-body">
          {taskList.map((item, index) => <TaskItem key={index} title={item} id={index} />)}
        </div>
        <div className="panel-footer">
          <TaskForm addFn={addTask} />
        </div>
      </div>
    </React.Fragment>
  );
};
export default List;
