import { DataGrid } from '@material-ui/data-grid'

export default function NginxDigestTable(props) {
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'uri', headerName: "URL", width: 400 },
    { field: 'method', headerName: "method", width: 140 },
    { field: 'count', headerName: "count", width: 120 },
    { field: 'count2xx', headerName: "2xx", width: 110  },
    { field: 'count3xx', headerName: "3xx", width: 110  },
    { field: 'count4xx', headerName: "4xx", width: 110  },
    { field: 'count5xx', headerName: "5xx", width: 110  },
    { field: 'max', headerName: "max", width: 120  },
    { field: 'min', headerName: "min", width: 120  },
    { field: 'sum', headerName: "sum", width: 120  },
    { field: 'average', headerName: "average", width: 150  },
    { field: 'minBody', headerName: "minBody", width: 150  },
    { field: 'maxBody', headerName: "maxBody", width: 150  },
    { field: 'averageBody', headerName: "averageBody", width: 150  },
    { field: 'sumBody', headerName: "sumBody", width: 150  },
  ];

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={props.rows.map((row, key) => { return {...row, id: key}})}
        columns={columns}
        // pageSize={5}
        rowsPerPageOptions={[20]}
      />
    </div>
  );
}
