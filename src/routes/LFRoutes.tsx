import { Layout } from '../components/components'
import { basePathName, routes } from '../constants'
import {
  Contacto,
  Inicio,
  Login,
  Mascotas,
  Nosotros,
  Registro
} from '../pages/pages'

export interface RoutesType {
  element: React.ReactElement
  path: string
  key: string
}

const LFRoutes: RoutesType[] = [
  {
    element: (
      <Layout>
        <Inicio />
      </Layout>
    ),
    path: basePathName,
    key: routes.home.url
  },
  {
    element: (
      <Layout>
        <Inicio />
      </Layout>
    ),
    path: routes.home.url,
    key: routes.home.url
  },
  {
    element: (
      <Layout>
        <Contacto />
      </Layout>
    ),
    path: routes.contact.url,
    key: routes.contact.url
  },
  {
    element: (
      <Layout>
        <Mascotas />
      </Layout>
    ),
    path: routes.pets.url,
    key: routes.pets.url
  },
  {
    element: (
      <Layout>
        <Nosotros />
      </Layout>
    ),
    path: routes.about.url,
    key: routes.about.url
  },
  {
    element: (
      <Layout>
        <Registro />
      </Layout>
    ),
    path: routes.registration.url,
    key: routes.registration.url
  },
  {
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
    path: routes.login.url,
    key: routes.login.url
  }
]

export default LFRoutes
