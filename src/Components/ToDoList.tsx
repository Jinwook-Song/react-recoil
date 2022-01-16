import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';

interface IForm {
  toDo: string;
}

type ToDoState = 'TO_DO' | 'DOING' | 'DONE';

interface IToDo {
  text: string;
  id: number;
  category: ToDoState;
}

const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((prevToDos) => [
      { text: toDo, id: Date.now(), category: 'TO_DO' },
      ...prevToDos,
    ]);
    setValue('toDo', '');
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register('toDo', {
            required: 'Please write a To Do',
          })}
          placeholder='Write a to do'
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
