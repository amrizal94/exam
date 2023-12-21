import '../styles/App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** import components */
import Main from './Main';
import Exam from './Exam';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';
import AddQuestion from './AddQuestion';

/** react routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>
  },
  {
    path: '/exam',
    element: <CheckUserExist><Exam /></CheckUserExist>
  },
  {
    path: '/result',
    element: <CheckUserExist><Result /></CheckUserExist>
  },
  {
    path: '/questions',
    element: <AddQuestion />
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
