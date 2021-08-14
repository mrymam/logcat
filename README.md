This is log viewer client app (https://zealous-franklin-13c0f2.netlify.app/)
Now, Logcat support only nginx access log.
Then set access.log to ltsv format.

## Local Build
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## nginx log format

set nginx.conf as below
```ltsv
  log_format ltsv "time:$time_local"
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
    "\tvhost:$host";
```