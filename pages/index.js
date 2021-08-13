import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { parse, digest } from 'nginx-access-log'

import NginxDigestTable from '../components/NginxDigestTable'
import { useRouter } from 'next/router'

const DEFAULT_NAME = "NGINX LOG"
const DEFAULT_URL = "/access.log"

export default function Home() {
  const router = useRouter()
  const url = router.query.url ?? DEFAULT_URL
  const baseName = router.query.name ?? DEFAULT_NAME

  const [rows, setRows] = useState([])
  const [name, setName] = useState(baseName)
  const [tmpName, setTmpName] = useState(baseName)
  const [accesslogUrl, setUrl] = useState(url)
  const [tmpUrl, setTmpUrl] = useState(url)

  useEffect(() => {
    fetch(accesslogUrl)
      .then(async (res) => {
        const text = await res.text()
        const logs = parse(text)
        const query = { uriPatterns: [] }
        const result = digest(logs, query)

        setRows(result)
      })

    if (name !== DEFAULT_NAME && accesslogUrl !== DEFAULT_URL) {
      router.push({
        pathname: "/",
        query: {
          name,
          url: accesslogUrl
        }
      })
    }
  }, [accesslogUrl, name])

  useEffect(() => {
    setName(baseName)
    setTmpName(baseName)
    setUrl(url)
    setTmpUrl(url)
  }, [url, baseName])

  const [edit, setEdit] = useState(false)

  return (
    <Container>
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
            }}>設定する</Button>
          </>
          :
          <>
            <p>{name}: {accesslogUrl}</p>
            <p></p>
            <Button variant="contained" onClick={() => setEdit(true)} >変更する</Button>
          </>
      }

      <NginxDigestTable rows={rows} />
    </Container>
  )
}
