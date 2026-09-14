import { createBrowserRouter, Navigate } from 'react-router-dom'

import { DocumentationHome } from '@/modules/documentation/DocumentationHome'
import { DocumentViewer } from '@/modules/documentation/DocumentViewer'
import { HubPage } from '@/modules/hub/HubPage'
import { PrototypeChrome } from '@/modules/prototype/components/PrototypeChrome'
import { PrototypeHome } from '@/modules/prototype/PrototypeHome'
import { FulfillmentPage } from '@/modules/prototype/v1/fulfillment/FulfillmentPage'
import { LandingPage } from '@/modules/prototype/v1/LandingPage'
import { LandingPage as LandingPageV2 } from '@/modules/prototype/v2/LandingPage'
import { LandingPage as LandingPageV3 } from '@/modules/prototype/v3/LandingPage'

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
      {
        path: '/prototipo/v2',
        element: (
          <PrototypeChrome>
            <LandingPageV2 />
          </PrototypeChrome>
        ),
      },
      // La página de Fulfillment es una sola: la v2 monta el mismo componente
      // bajo su propia ruta para que el recorrido no salte a /prototipo/v1.
      {
        path: '/prototipo/v2/fulfillment',
        element: (
          <PrototypeChrome>
            <FulfillmentPage />
          </PrototypeChrome>
        ),
      },
      // La v3 no tiene ruta de Fulfillment: su acceso abre el flyer en un visor
      // sobre la propia landing (`#fulfillment`).
      {
        path: '/prototipo/v3',
        element: (
          <PrototypeChrome>
            <LandingPageV3 />
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
