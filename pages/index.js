import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { parse, digest } from 'nginx-access-log'

import NginxDigestTable from '../components/NginxDigestTable'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const url = router.query.url ?? "/access.log"

  const [rows, setRows] = useState([])
  const [name, setName] = useState("nginx log")
  const [accesslogUrl, setUrl] = useState(url)
  const [tmpUrl, setTmpUrl] = useState(url)

  useEffect(() => {
    accesslogUrl
    fetch(accesslogUrl)
      .then(async (res) => {
        const text = await res.text()
        const logs = parse(text)
        const query = { uriPatterns: [] }
        const result = digest(logs, query)

        setRows(result)
        console.log(res, text)
      })
  }, [accesslogUrl])

  const [edit, setEdit] = useState(false)

  return (
    <Container>
      {
        edit ?
          <>
            <TextField fullWidth label="log name" id="name" value={name} onChange={e => setName(e.target.value)} />
            <p></p>
            <TextField fullWidth label="nginx url" id="nginxUrl" value={tmpUrl} onChange={e => setTmpUrl(e.target.value)} />
            <p></p>
            <Button variant="contained" onClick={() => {
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
