import { Link, useParams } from 'react-router-dom'

import { ModuleLayout } from '@/app/ModuleLayout'

import { findDocument } from './documents'
import styles from './DocumentViewer.module.css'

export function DocumentViewer() {
  const { docId } = useParams()
  const doc = findDocument(docId)

  if (!doc) {
    return (
      <ModuleLayout
        title="Documento no encontrado"
        summary="Ese documento no existe en el módulo de documentación."
        breadcrumb={{ label: 'Documentación', to: '/documentacion' }}
      >
        <Link className={styles.back} to="/documentacion">
          Volver al listado
        </Link>
      </ModuleLayout>
    )
  }

  const downloadUrl = URL.createObjectURL(
    new Blob([doc.content], { type: 'text/markdown;charset=utf-8' }),
  )

  return (
    <ModuleLayout
      title={doc.title}
      summary={doc.summary}
      breadcrumb={{ label: 'Documentación', to: '/documentacion' }}
    >
      <div className={styles.toolbar}>
        <a className={styles.download} href={downloadUrl} download={doc.fileName}>
          Descargar {doc.fileName}
        </a>
        <Link className={styles.back} to="/documentacion">
          Volver al listado
        </Link>
      </div>
      <pre className={styles.content}>{doc.content}</pre>
    </ModuleLayout>
  )
}
