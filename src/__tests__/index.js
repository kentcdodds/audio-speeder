import 'jest-dom/extend-expect'

import React, {useState} from 'react'
import {render, fireEvent, cleanup} from 'react-testing-library'

afterEach(cleanup)

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  )
}

test('renders counter', () => {
  const {getByText} = render(<Counter />)
  const count = getByText('0')
  const button = getByText(/click me/i)
  fireEvent.click(button)
  expect(count).toHaveTextContent('1')
})
