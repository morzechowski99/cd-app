import { RouteProps } from 'react-router-dom'

export interface ModuleRoute extends RouteProps {
  path: string
  public?: boolean
}

export interface Module<Name, Reducer> {
  name: Name
  routes: ModuleRoute[]
  reducer: Reducer
}