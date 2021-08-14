import { useState, useEffect, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'

import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'

import { parse, digest } from 'nginx-access-log'

import NginxDigestTable from '../components/NginxDigestTable'
import { useRouter } from 'next/router'

import { DocumentContext } from './_app'

const DEFAULT_NAME = "NGINX LOG"
const DEFAULT_URL = "/access.log"


export default function Nginx() {
  const router = useRouter()
  const [rows, setRows] = useState([])
  const [logs, setLogs] = useState([])
  const [name, setName] = useState(DEFAULT_NAME)
  const [accesslogUrl, setUrl] = useState(DEFAULT_URL)
  const [tmpUrl, setTmpUrl] = useState(DEFAULT_URL)
  const [uriPatterns, setUriPatterns] = useState([])

  const [document, setDocument] = useContext(DocumentContext)

  useEffect(() => {
    if (router.asPath !== router.route) {
      setUrl(router.query.url ?? DEFAULT_URL)
      setTmpUrl(router.query.url ?? DEFAULT_URL)
      setName(router.query.name ?? DEFAULT_NAME)
      setUriPatterns(router.query.patterns ? router.query.patterns.split(",") : [])
    }
  }, [router]);

  useEffect(() => {
    fetch(accesslogUrl)
      .then(async (res) => {
        const text = await res.text()
        setLogs(parse(text))
      })
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
  const [editPatten, setEditPatten] = useState(false)
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
      marginRight: "8px"
    }
  }


  return (
    <>
      {
        edit ?
          <>
            <TextField fullWidth label="nginx url" id="nginxUrl" value={tmpUrl} onChange={e => setTmpUrl(e.target.value)} />
            <p></p>
            <Button variant="contained" onClick={() => {
              setName(tmpName)
              setUrl(tmpUrl)
              setEdit(false)
            }}>変更する</Button>
            <p></p>
          </>
          :
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            mb={2}
          >
            <p style={style.url}>{accesslogUrl}</p>
            <Button variant="contained" size={"small"} onClick={() => setEdit(true)} ><SettingsIcon />ログ名、URLを変更する</Button>
          </Grid>
      }

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        mb={3}
        mt={4}
      >
        {
          uriPatterns.map(pattern =>

            <Button style={style.patternButton} key={pattern} variant="outlined" size="small" onClick={() => deletePattern(pattern)}>{pattern}</Button>
          )
        }
        <Button variant="contained" size={"small"} onClick={() => setEditPatten(true)}><AddIcon/>URIパターンを追加</Button>
      </Grid>

      <Grid mb={4}>
      {
        editPatten ? <>
          <TextField fullWidth label="Pattern" id="pattern" value={newPatten} onChange={e => setNewPatten(e.target.value)} />
          <p></p>
          <Button variant="contained" onClick={() => {
            setUriPatterns([...uriPatterns, newPatten])
            setNewPatten("")
            setEditPatten(false)
          }}>追加する</Button>
        </> : <></>
        }
      </Grid>

      <NginxDigestTable rows={rows} />
    </>
  )
}
