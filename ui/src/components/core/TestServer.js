import { Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';


function TestServer() {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    fetch('http://localhost:3030/check')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(`Got the result: ${result}`);
          setData({ hits: [result] });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw error;
        },
      );
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justify="space-between"
      alignItems="center">
      {/* DELETE THIS */}
      <Grid item>
        <Paper>
          <ul>
            {data.hits.map((item) => (
              <li key={item}>
                <p>{item.message}</p>
              </li>
            ))}
          </ul>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TestServer;
