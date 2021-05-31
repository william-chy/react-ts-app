import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

interface TaskItemProps {
  title?: string;
  id: number;
}

const TaskItem = (props: TaskItemProps) => {
  return (
    <div className="task-item">
      <input type="checkbox" name={'task' + props.id} id={'task' + props.id} />
      <label htmlFor={'task' + props.id}>
        <Link to={`/detail?id=${props.id}`}>{props.title}</Link>
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
    <div>
      <input
        className="TaskInput"
        type="text"
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />
      <button onClick={() => props.addFn(taskTitle)} className="TaskButton">
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
    settaskList([...taskList]);
  };
  return (
    <React.Fragment>
      <h1>待办事项</h1>
      <TaskForm addFn={addTask} />
      {taskList.map((item, index) => <TaskItem key={index} title={item} id={index} />)}
    </React.Fragment>
  );
};
export default List;
