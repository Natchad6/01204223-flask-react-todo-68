import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'
import TodoItem from '../TodoItem.jsx'
import '@testing-library/jest-dom';

const baseTodo = {             
  id: 1,
  title: 'Sample Todo',
  done: false,
  comments: [],
};

describe('TodoItem', () => {

  it('renders with no comments correctly', () => {
    render(
      <TodoItem 
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    );

    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    expect(screen.getByText('No Comments')).toBeInTheDocument();
  });
  

  it('renders with comments correctly', () => {

    const todoWithComment = {
      ...baseTodo,
      comments: [
        { id: 1, message: 'First comment' },
        { id: 2, message: 'Another comment' },
      ]
    };

    render(
      <TodoItem 
        todo={todoWithComment}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={() => {}}
      />
    );

    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Another comment')).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });


  it('makes callback to toggleDone when Toggle button is clicked', () => {
    const onToggleDone = vi.fn();
    const onDeleteTodo = vi.fn();

    render(
      <TodoItem 
        todo={baseTodo} 
        toggleDone={onToggleDone}
        deleteTodo={onDeleteTodo}
        addNewComment={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: /toggle/i });
    button.click();

    expect(onToggleDone).toHaveBeenCalledWith(baseTodo.id);
  });


  it('makes callback to deleteTodo when delete button is clicked', () => {
    const onDeleteTodo = vi.fn();

    render(
      <TodoItem 
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={onDeleteTodo}
        addNewComment={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: '❌' });
    button.click();

    expect(onDeleteTodo).toHaveBeenCalledWith(baseTodo.id);
  });


  it('makes callback to addNewComment when a new comment is added', async () => {
    const onAddNewComment = vi.fn();

    render(
      <TodoItem
        todo={baseTodo}
        toggleDone={() => {}}
        deleteTodo={() => {}}
        addNewComment={onAddNewComment}
      />
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'New comment');

    const button = screen.getByRole('button', { name: /add comment/i });
    fireEvent.click(button);

    expect(onAddNewComment).toHaveBeenCalledWith(baseTodo.id, 'New comment');
  });

  

});
