import React, { useState, useEffect, useCallback } from "react";
import { useCurrentPatientData } from "../../store/PatientDataContext";
import { updatePatientRecord } from "../../../backend/api";
import { Todo } from "../ProfileDataType";

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  const { patientData } = useCurrentPatientData();
  const [newTodoText, setNewTodoText] = useState("");
  const [localTodos, setLocalTodos] = useState<Todo[]>(todos || []);
  const [isSaving, setIsSaving] = useState(false);

  // Debounce function to delay API calls
  const debounce = (func: () => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  };

  // Save to DB after user inactivity
  const saveTodosToDB = useCallback(
    debounce(async () => {
      setIsSaving(true);
      try {
        await updatePatientRecord({
          patientId: patientData.pid,
          updateType: "todo",
          updateData: localTodos,
        });
      } catch (error) {
        console.error("Error saving todos:", error);
      } finally {
        setIsSaving(false);
      }
    }, 5000), // 3s debounce delay
    [localTodos]
  );

  // Watch for changes in localTodos and trigger batch update
  useEffect(() => {
    if (localTodos !== patientData.todos) {
      saveTodosToDB();
    }
  }, [localTodos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const newTodo: Todo = {
      id: `todo_${Date.now()}`,
      text: newTodoText,
      completed: false,
      priority: "Medium",
    };

    setLocalTodos((prev) => [...prev, newTodo]);
    setNewTodoText(""); // Reset input
  };

  const toggleTodoCompletion = (id: string) => {
    setLocalTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list-main col-5">
      <p>Todo List / Notes <br />{isSaving && <span role="status">Syncing Data...</span>}</p>

      <form onSubmit={addTodo} className="add-todo-wrapper mt-3">
        <label htmlFor="addTodoInput" className="sr-only">Add a new todo item</label>
        <input
          type="text"
          id="addTodoInput"
          name="addTodoText"
          required
          placeholder="Add Item"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button type="submit" className="icon glass-green-btn" aria-label="Add todo item">
          <i className="fi fi-br-add" aria-hidden="true"></i>
        </button>
      </form>

      <div className="todos-list">
        <ul>
          {localTodos.map((todo) => (
            <li className={`todo-item ${todo.completed ? "todo-completed" : ""}`} key={todo.id}>
              <button
                className="todo-toggle-btn"
                onClick={() => toggleTodoCompletion(todo.id)}
                aria-pressed={todo.completed}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
              >
                {todo.text}
              </button>
              <button className="glass-red-btn" onClick={() => deleteTodo(todo.id)} aria-label={`Delete "${todo.text}"`}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
