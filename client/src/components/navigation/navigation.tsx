import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home } from '../../pages/home'
import { Login } from '../../pages/login'
import { CreatePage } from '../create-page'
import { NotFound } from '../not-found'
import { PagePreview } from '../page-preview'
import { RenamePage } from '../rename-page'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />}>
        <Route path="page/create/new" element={<CreatePage />} />
        <Route path="page/rename/:pageId" element={<RenamePage />} />
        <Route path="page/:pageId" element={<PagePreview />} />
        <Route path="/" element={<PagePreview.PagePreviewPlaceholder />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

export default function Navigation() {
  return <RouterProvider router={router} />
}
