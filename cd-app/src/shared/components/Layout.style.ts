import { styled } from '@material-ui/core'

const TOOLBAR_HEIGHT = 73

export const Container = styled('div')({
  minHeight: `calc(100vh - ${TOOLBAR_HEIGHT}px)`,
})

export const Content = styled('main')({
  minHeight: '100%',
  paddingLeft: '10%',
  paddingRight: '10%',
})