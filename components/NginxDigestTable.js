import { TableContainer, TableBody, TableHead, Table, TableRow, TableCell, Paper } from '@material-ui/core'

export default function NginxDigestTable(props) {
  return (
      <TableContainer component={Paper}>
        <Table
          // sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>uri</TableCell>
              <TableCell align="right">method</TableCell>
              <TableCell align="right">count</TableCell>
              <TableCell align="right">2xx</TableCell>
              <TableCell align="right">3xx</TableCell>
              <TableCell align="right">4xx</TableCell>
              <TableCell align="right">5xx</TableCell>
              <TableCell align="right">max</TableCell>
              <TableCell align="right">min</TableCell>
              <TableCell align="right">sum</TableCell>
              <TableCell align="right">average</TableCell>
              <TableCell align="right">minBody</TableCell>
              <TableCell align="right">maxBody</TableCell>
              <TableCell align="right">averageBody</TableCell>
              <TableCell align="right">sumBody</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.uri}
                </TableCell>
                <TableCell align="right">{row.method}</TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">{row.count2xx}</TableCell>
                <TableCell align="right">{row.count3xx}</TableCell>
                <TableCell align="right">{row.count4xx}</TableCell>
                <TableCell align="right">{row.count5xx}</TableCell>
                <TableCell align="right">{row.max}</TableCell>
                <TableCell align="right">{row.min}</TableCell>
                <TableCell align="right">{row.sum}</TableCell>
                <TableCell align="right">{row.average}</TableCell>
                <TableCell align="right">{row.minBody}</TableCell>
                <TableCell align="right">{row.maxBody}</TableCell>
                <TableCell align="right">{row.averageBody}</TableCell>
                <TableCell align="right">{row.sumBody}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}
