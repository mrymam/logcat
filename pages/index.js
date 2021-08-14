import { Container, Typography, Grid, TextField, Button } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/system';
import { useRouter } from 'next/router'
import { useState } from 'react'

const theme = createTheme({
  typography: {
    fontSize: 55
  },
})

const getStartedTheme = createTheme({
  typography: {
    fontSize: 40
  },
})

export default function Index() {
  const [name, setName] = useState("Nginx Server1")
  const [url, setUrl] = useState("")
  const router = useRouter()

  return <Container>
    <Grid container spacing={0} mb={10}>
      <Grid item xs={4}>
        <Typography mt={12} mb={4} fontWeight={"bold"} theme={theme}>Logcat</Typography>
        <Box fontSize={20}>
          ログを整形して表示することができます。
          現在は、nginxのログのみ対応しています。
        </Box>
      </Grid>
      <Grid item xs={8}>
        <img
          src={'/table-image.svg'}
          loading="lazy"
        />
      </Grid>
    </Grid>

    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography mt={8} fontWeight={"bold"} theme={getStartedTheme}>Get Started!</Typography>
        <Box fontSize={20} ml={1} mb={4}>
          nginxのアクセスログを表示する
        </Box>
      </Grid>

      <Grid container xs={12}>
        <Grid xs={4} mb={4} pl={1} pr={1}>
          <TextField
            fullWidth
            label="Log Name"
            placeholder={"Nginx Server1"}
            value={name}
            onChange={e => { setName(e.target.value) }}
            mb={4}
          />
        </Grid>

        <Grid xs={8} mb={4}>
          <TextField
            fullWidth
            label="URL"
            placeholder={"https://example.com/access.log"}
            value={url}
            onChange={e => { setUrl(e.target.value) }}
            mb={4}
            />
        </Grid>
      </Grid>
      <Grid pl={1}>
        <Button size="large" variant="contained" onClick={() => {
          router.push({
            pathname: "/nginx",
            query: {
              name,
              url
            }
          })
        }}>Nginxのアクセスログを集計する</Button>
      </Grid>
    </Grid>
  </Container>
}