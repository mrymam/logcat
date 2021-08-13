import '../styles/globals.css'

import styles from '../styles/Home.module.css'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

console.log("もし不具合があれば、リポジトリにイシューお願いします")
console.log("https://github.com/onyanko-pon/logcat/issues")

function MyApp({ Component, pageProps }) {

  return <>
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Logcat
            </Typography>
            <Button color="inherit" href="/nginx">
              nginx
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        maxWidth={"xl"}
      >
        <Box pt={10} pb={10} >
          <Component {...pageProps} />
        </Box>
      </Container>
    </main>

    <footer className={styles.footer}>
      <a
        href="https://github.com/onyanko-pon/logcat"
        target="_blank"
        rel="noopener noreferrer"
      >
        onyanko-pon/logcat
      </a>
  </footer>
  </>
}

export default MyApp
