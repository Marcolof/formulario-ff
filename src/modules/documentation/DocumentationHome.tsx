import { Link } from 'react-router-dom'

import { ModuleLayout } from '@/app/ModuleLayout'

import { documents } from './documents'
import styles from './DocumentationHome.module.css'

export function DocumentationHome() {
  return (
    <ModuleLayout
      title="Documentación"
      summary="Los documentos funcionales del proyecto. Se editan como Markdown en la carpeta documentation/ y se leen o descargan desde acá: no hay una segunda copia."
    >
      <ul className={styles.list}>
        {documents.map((doc) => (
          <li key={doc.id}>
            <Link className={styles.card} to={`/documentacion/${doc.id}`}>
              <span className={styles.index}>{doc.index}</span>
              <div>
                <h2 className={styles.title}>{doc.title}</h2>
                <p className={styles.summary}>{doc.summary}</p>
                <p className={styles.file}>{doc.fileName}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </ModuleLayout>
  )
}
