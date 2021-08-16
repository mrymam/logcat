import { Container, Typography, Grid, TextField, Button } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/system';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CodeBlock, atomOneLight } from "react-code-blocks";
import ReactGA from 'react-ga';

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

const stepTheme = createTheme({
  typography: {
    fontSize: 28
  },
})

export default function Index() {
  ReactGA.initialize('G-SFXWTBDBV6');
  ReactGA.pageview('/');

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
          nginxのアクセスログを集計してみる
        </Box>
      </Grid>

      <Grid mb={4}>
        <Typography mt={2} fontWeight={"bold"} theme={stepTheme}>1. Set Log Format</Typography>
        <Box fontSize={20} ml={1} mt={1} mb={4}>
          nginxの設定ファイル(nginx.confなど)でのアクセスログのフォーマットを設定する。
        </Box>
        <CodeBlock
          text={
            `log_format ltsv "time:$time_local"
            "\thost:$remote_addr"
            "\tforwardedfor:$http_x_forwarded_for"
            "\treq:$request"
            "\tmethod:$request_method"
            "\turi:$request_uri"
            "\tstatus:$status"
            "\tsize:$body_bytes_sent"
            "\treferer:$http_referer"
            "\tua:$http_user_agent"
            "\treqtime:$request_time"
            "\truntime:$upstream_http_x_runtime"
            "\tapptime:$upstream_response_time"
            "\tcache:$upstream_http_x_cache"
            "\tvhost:$host";`
          }
          showLineNumbers={false}
          startingLineNumber={false}
          theme={atomOneLight}
        />
      </Grid>

      <Grid mb={4}>
        <Typography mt={2} fontWeight={"bold"} theme={stepTheme}>2. Set Endpoint to access.log </Typography>
        <Box fontSize={20} ml={1} mt={1} mb={4}>
          nginxのアクセスログをHTTP経由で取得できるようにエンドポイントを設定してください。例えば、nginxで静的ファイル配信するなどの方法があります。
        </Box>
      </Grid>

      <Grid>
        <Typography mt={2} fontWeight={"bold"} theme={stepTheme}>3. Set Name & Endpoint to Logcat </Typography>
        <Box fontSize={20} ml={1} mt={1} mb={6}>
          ログのエンドポイントと識別する名前を入力してスタートです。
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
      <Grid pl={1} mb={8}>
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