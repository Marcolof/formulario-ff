import { createBrowserRouter, Navigate } from 'react-router-dom'

import { DocumentationHome } from '@/modules/documentation/DocumentationHome'
import { DocumentViewer } from '@/modules/documentation/DocumentViewer'
import { HubPage } from '@/modules/hub/HubPage'
import { PrototypeChrome } from '@/modules/prototype/components/PrototypeChrome'
import { PrototypeHome } from '@/modules/prototype/PrototypeHome'
import { FulfillmentPage } from '@/modules/prototype/v1/fulfillment/FulfillmentPage'
import { LandingPage } from '@/modules/prototype/v1/LandingPage'

import { RootLayout } from './RootLayout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HubPage /> },
      { path: '/prototipo', element: <PrototypeHome /> },
      {
        path: '/prototipo/v1',
        element: (
          <PrototypeChrome>
            <LandingPage />
          </PrototypeChrome>
        ),
      },
      {
        path: '/prototipo/v1/fulfillment',
        element: (
          <PrototypeChrome>
            <FulfillmentPage />
          </PrototypeChrome>
        ),
      },
      { path: '/documentacion', element: <DocumentationHome /> },
      { path: '/documentacion/:docId', element: <DocumentViewer /> },
      // Las rutas viejas quedan enlazadas en notas y mensajes: mejor volver al
      // Hub que dejar una pantalla de error.
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
