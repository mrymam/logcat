import React, { useState, useEffect, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SettingsIcon from '@material-ui/icons/Settings'
import ReplayIcon from '@material-ui/icons/Replay'
import Box from '@material-ui/core/Box'

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Stack from '@material-ui/core/Stack';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';

import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'

import { parse, digest } from 'nginx-access-log'

import NginxDigestTable from '../components/NginxDigestTable'
import { useRouter } from 'next/router'

import { DocumentContext } from './_app'
import { createTheme } from '@material-ui/core/styles'

const DEFAULT_NAME = "NGINX LOG"
const DEFAULT_URL = "/access.log"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Nginx() {
  const router = useRouter()
  const [rows, setRows] = useState([])
  const [logs, setLogs] = useState([])
  const [name, setName] = useState(DEFAULT_NAME)
  const [accesslogUrl, setUrl] = useState(DEFAULT_URL)
  const [tmpUrl, setTmpUrl] = useState(DEFAULT_URL)
  const [uriPatterns, setUriPatterns] = useState([])
  const [backdrop, setBackdrop] = useState(false)
  const [snackbar, setSnackbar] = useState(false)

  const [document, setDocument] = useContext(DocumentContext)


  useEffect(() => {
    if (router.asPath !== router.route) {
      setUrl(router.query.url ?? DEFAULT_URL)
      setTmpUrl(router.query.url ?? DEFAULT_URL)
      setName(router.query.name ?? DEFAULT_NAME)
      setUriPatterns(router.query.patterns ? router.query.patterns.split(",") : [])
    }
  }, [router]);

  const handleRetry = () => {
    fetch(accesslogUrl)
      .then(async (res) => {
        setBackdrop(true)
        const text = await res.text()
        setLogs(parse(text))
        setBackdrop(false)
      })
  }

  useEffect(() => {
    handleRetry()
  }, [accesslogUrl])

  useEffect(() => {
    const query = { uriPatterns }
    const result = digest(logs, query)
    setRows(result)
  }, [uriPatterns, logs])

  useEffect(() => {
    setDocument({ ...document, title: `${name} | Logcat` })
  }, [name])

  const [edit, setEdit] = useState(false)
  const [newPatten, setNewPatten] = useState("")

  const deletePattern = (deletePattern) => {
    const patterns = uriPatterns.filter(pattern => pattern !== deletePattern)
    setUriPatterns(patterns)
  }

  const style = {
    patternButton: {
      textTransform: 'none',
      marginRight: "8px"
    },
    url: {
      marginRight: "8px",
      fontSize: "20px"
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    },
    modalTitle: {
      fontSize: 32
    }
  }

  const titleTheme = createTheme({
    typography: {
      fontSize: 40
    },
  })

  const nameTheme = createTheme({
    typography: {
      fontSize: 20
    }
  })


  return (
    <>
      <Grid mb={2}>
        <Grid xs={12}>
          <Typography mb={1} fontWeight={"bold"} theme={titleTheme}>Nginx Access Log <ReplayIcon onClick={handleRetry} /></Typography>
        </Grid>

        <Grid
          container
          xs={12}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          fullWidth
        >
          <Grid mr={1}>
            <Typography theme={nameTheme}>{name}</Typography>
          </Grid>
          <Grid>
            <SettingsIcon onClick={() => setEdit(true)} />
          </Grid>
        </Grid>

      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-end"
        mb={3}
        mt={4}
      >
        <Grid mr={2}>
          <TextField
            width={800}
            label="URIパターンを追加"
            variant={"standard"}
            id="pattern"
            value={newPatten}
            onChange={e => { setNewPatten(e.target.value) }}
            onKeyPress={e => {
              if (e.key == 'Enter') {
                setUriPatterns([...uriPatterns, newPatten])
                setNewPatten("")
                setEditPatten(false)
              }
            }}
            />
          </Grid>
        {
          uriPatterns.map((pattern, key) =>

            <Button
              style={style.patternButton}
              key={key}
              variant="outlined"
              size="small"
              onClick={() => deletePattern(pattern)}>
              {pattern}
            </Button>
          )
        }
      </Grid>
      <NginxDigestTable rows={rows} />

      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modal}>
          <Box mb={3}>
            <Typography id="modal-modal-title" variant="h4" style={style.modalTitle} component="h2">
              ログのURLを変更
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="URLを設定"
            variant={"standard"}
            id="pattern"
            placeholder={"https://example.com/access.log"}
            value={tmpUrl}
            onChange={e => { setTmpUrl(e.target.value) }}
          />
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-end"
            mt={4}
          >
            <Box mr={1} >
              <Button variant="contained" onClick={() => {
                router.push({
                  pathname: "/nginx",
                  query: {
                    name,
                    url: tmpUrl,
                    patterns: uriPatterns.join(",")
                  }
                })
                setUrl(tmpUrl)
                setEdit(false)
                setSnackbar(true)
              }}>変更</Button>
            </Box>
            <Box>
              <Button variant="contained" color="error" onClick={() => setEdit(false)}>キャンセル</Button>
            </Box>
          </Grid>
        </Box>
      </Modal>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
        onClick={() => setBackdrop(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={snackbar} autoHideDuration={6000} onClose={() => setSnackbar(false)}>
          <Alert onClose={() => setSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            URLを更新しました
          </Alert>
        </Snackbar>
      </Stack>
    </>
  )
}
