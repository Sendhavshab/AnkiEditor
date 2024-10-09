import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import CodeProvider from './HOC&Context/Provider/CodeProvider'
import ConsoleValueProvide from './HOC&Context/Provider/ConsoleValueProvide'
import FolderInfoProvider from './HOC&Context/Provider/FolderInfoProvider'
import UserAccountProvider from './HOC&Context/Provider/UserAccountProvider'
import Loader from './AlertAndLoader/Loder/Loader'
import { ToastContainer } from 'react-toastify'

const LogIn = lazy(() => import('./Acount/LogIn'))
const SignUp = lazy(() => import('./Acount/SignUp'))
const DashBoard = lazy(() => import('./Component/DashBoard/DashBoard'))
const Assignment = lazy(() => import('./Component/Assignments/Assignment'))
const Practice = lazy(() => import('./Component/Practice/Practice'))
const Preview = lazy(() => import('./Component/MakeWeb/Website'))
const NotFound = lazy(() => import('./Component/NotFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoard />,
    index: true,
  },
  {
    path: '/assignment/c/:assiID/:didshare?',
    element: <Assignment />,
  },
  {
    path: '/web/:codeid',
    element: <Preview />,
  },
  {
    path: '/:username/:foldername',
    element: <Preview />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/code/a/:practiceId/:didshare?',
    element: <Practice />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const App = () => {
  console.log('window')

  return (
    <div className="">
      <FolderInfoProvider>
        <ToastContainer theme="dark" autoClose={2000} />
        <UserAccountProvider>
          <ConsoleValueProvide>
            <CodeProvider>
              <Suspense fallback={<Loader></Loader>}>
                <RouterProvider router={router} />
              </Suspense>
            </CodeProvider>
          </ConsoleValueProvide>
        </UserAccountProvider>
      </FolderInfoProvider>
    </div>
  )
}

export default App
