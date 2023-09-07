import React, { useState } from "react";

import { TextField, Grid, Typography } from "@mui/material";

import { InputField } from "./InputField";

import axios from "axios";

function App() {
  const [value, setValue] = useState({
    url: "",
    method: "GET",
    body: null,
    headers: null,
  });
  const [loading, setLoading] = useState(false);

  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);

  const submit = async () => {
    setError(null);

    if (value.url === "") return;

    setLoading(true);
    console.log(value.headers);
    try {
      const response = await axios({
        method: value.method,
        url: value.url,
        data: JSON.parse(value.body),
        headers: JSON.parse(value.headers),
      });

      setJsonData(response);
      setLoading(false);
    } catch (error) {
      setJsonData(null);
      setLoading(false);
      setError(error);
    }
  };

  return (
    <Grid container sx={{ padding: 4 }}>
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
        {error && (
          <pre>
            <Typography>{JSON.stringify(error, null, 2)}</Typography>
          </pre>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
