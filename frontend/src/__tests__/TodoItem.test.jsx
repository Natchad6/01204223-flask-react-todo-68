import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
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
        <TodoItem todo={baseTodo} />
    );
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    expect(screen.getByText('No Comments')).toBeInTheDocument();
  });
  
  it('renders with comments correctly', () => {

    const todoWithComment = {
        ...baseTodo,
        comments: [
          {id: 1, message: 'First comment'},
          {id: 2, message: 'Another comment'},
        ]
      };
      render(
        <TodoItem todo={todoWithComment} />
      );

    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    expect(screen.queryByText('First comment')).toBeInTheDocument();    
    expect(screen.queryByText('Another comment')).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
    //
    // *** TODO: ให้เพิ่ม assertion ว่ามีข้อความ First comment และ Another comment บนหน้าจอ
    //

  });

});
