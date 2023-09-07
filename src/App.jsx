import React, { useState } from "react";

import { TextField, Grid, Typography } from "@mui/material";

import { InputField } from "./InputField";

import axios from "axios";

function App() {
  const [value, setValue] = useState({
    url: "",
    method: "GET",
    body: null,
    headers: {},
  });
  const [loading, setLoading] = useState(false);

  const [jsonData, setJsonData] = useState(null);

  const submit = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: value.method,
        url: value.url,
        body: JSON.parse(value.body),
        headers: value.headers,
      });

      setJsonData(response);
      setLoading(false);
    } catch (error) {
      setJsonData(null);
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ marginTop: 4 }}>
      <InputField
        loading={loading}
        submit={submit}
        value={value}
        setValue={setValue}
      />
      <Grid container item sx={{ marginTop: 2 }} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Response</Typography>
        </Grid>
        {jsonData && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Status: {jsonData?.status}
              </Typography>
            </Grid>
            <Grid item>
              <pre>{JSON.stringify(jsonData?.data, null, 2)}</pre>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
