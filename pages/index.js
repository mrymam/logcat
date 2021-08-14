import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'

import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'

import { parse, digest } from 'nginx-access-log'

import NginxDigestTable from '../components/NginxDigestTable'
import { useRouter } from 'next/router'

const DEFAULT_NAME = "NGINX LOG"
const DEFAULT_URL = "/access.log"


export default function Home() {
  const router = useRouter()
  const [rows, setRows] = useState([])
  const [logs, setLogs] = useState([])
  const [name, setName] = useState(DEFAULT_NAME)
  const [tmpName, setTmpName] = useState(DEFAULT_NAME)
  const [accesslogUrl, setUrl] = useState(DEFAULT_URL)
  const [tmpUrl, setTmpUrl] = useState(DEFAULT_URL)
  const [uriPatterns, setUriPatterns] = useState([])

  useEffect(() => {
    if (router.asPath !== router.route) {
      setUrl(router.query.url ?? DEFAULT_URL)
      setTmpUrl(router.query.url ?? DEFAULT_URL)
      setName(router.query.name ?? DEFAULT_NAME)
      setTmpName(router.query.name ?? DEFAULT_NAME)
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
    }
  }


  return (
    <>
      {
        edit ?
          <>
            <TextField fullWidth label="log name" id="name" value={tmpName} onChange={e => setTmpName(e.target.value)} />
            <p></p>
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
          <>
            <p><SettingsIcon onClick={() => setEdit(true)} /> {accesslogUrl}</p>
            {/* <Button variant="contained" onClick={() => setEdit(true)} >変更する</Button> */}
          </>
      }

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

      <p><AddIcon onClick={() => setEditPatten(true)} /></p>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        mb={4}
      >
        {
          uriPatterns.map(pattern =>

            <Button style={style.patternButton} key={pattern} variant="outlined" size="small" onClick={() => deletePattern(pattern)}>{pattern}</Button>
          )
        }
      </Grid>

      <NginxDigestTable rows={rows} />
    </>
  )
}
