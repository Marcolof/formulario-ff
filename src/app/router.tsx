import { createBrowserRouter, Navigate } from 'react-router-dom'

import { DocumentationHome } from '@/modules/documentation/DocumentationHome'
import { DocumentViewer } from '@/modules/documentation/DocumentViewer'
import { HubPage } from '@/modules/hub/HubPage'
import { PresentationHome } from '@/modules/presentation/PresentationHome'
import { PrototypeChrome } from '@/modules/prototype/components/PrototypeChrome'
import { PrototypeHome } from '@/modules/prototype/PrototypeHome'
import { FulfillmentPage } from '@/modules/prototype/v3/fulfillment/FulfillmentPage'
import { LandingPage } from '@/modules/prototype/v3/LandingPage'

import { RootLayout } from './RootLayout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HubPage /> },
      { path: '/prototipo', element: <PrototypeHome /> },
      {
        path: '/prototipo/v3',
        element: (
          <PrototypeChrome>
            <LandingPage />
          </PrototypeChrome>
        ),
      },
      // La v3 tiene pantalla propia de Fulfillment: un front distinto del de la
      // landing, según el diseño de Figma "Mi Correo 2.0" (nodo 13284:7345).
      {
        path: '/prototipo/v3/fulfillment',
        element: (
          <PrototypeChrome>
            <FulfillmentPage />
          </PrototypeChrome>
        ),
      },
      { path: '/documentacion', element: <DocumentationHome /> },
      { path: '/documentacion/:docId', element: <DocumentViewer /> },
      { path: '/presentacion', element: <PresentationHome /> },
      // Las rutas de la v1 y la v2 —retiradas el 2026-09-14— quedan enlazadas en
      // notas y mensajes viejos: mejor volver al Hub que una pantalla de error.
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
