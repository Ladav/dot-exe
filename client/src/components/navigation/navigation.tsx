import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider } from 'react-router-dom'
import { Home } from '../../pages/home'
import { getPageById } from '../../queries/page.queries'
import { NotFound } from '../not-found'
import { PagePreview } from '../page-preview'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route
        path="page/:pageId"
        loader={async ({ params }) => {
          const { pageId } = params
          if (pageId) {
            const data = await getPageById(pageId)
            return data
          }

          redirect('/not-found')
        }}
        element={<PagePreview />}
      />
      <Route path="/" element={<PagePreview.PagePreviewPlaceholder />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

export default function Navigation() {
  return <RouterProvider router={router} />
}
