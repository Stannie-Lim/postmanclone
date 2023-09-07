import React, { useState, useMemo } from "react";

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const Dropdown = ({ value, setValue, loading }) => {
  const handleChange = (event) => {
    setValue({ ...value, method: event.target.value });
  };

  return (
    <FormControl fullWidth disabled={loading}>
      <InputLabel>Method</InputLabel>
      <Select value={value.method} label="Method" onChange={handleChange}>
        {METHODS.map((method) => (
          <MenuItem value={method} key={method}>
            {method}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const URLInput = ({ value, setValue, loading }) => {
  const handleChange = (event) => {
    setValue({ ...value, url: event.target.value });
  };

  return (
    <TextField
      disabled={loading}
      label="Enter URL"
      fullWidth
      value={value.url}
      onChange={handleChange}
    />
  );
};

const HeadersInput = (props) => {
  return <></>;
};

const BodyInput = (props) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    props.setValue({ ...props.value, body: event.target.value });
    setValue(event.target.value);
  };

  if (props.value.method === "GET" || props.value.method === "DELETE") {
    return <></>;
  }

  return (
    <TextField
      fullWidth
      value={value}
      placeholder={`{
    "key1": "value",
    "key2": ["value1", "value2"],
    "key3": {}
}`}
      onChange={onChange}
      multiline
      rows={10}
      onKeyDown={(e) => {
        const { value } = e.target;

        if (e.key === "Tab") {
          e.preventDefault();

          const cursorPosition = e.target.selectionStart;
          const cursorEndPosition = e.target.selectionEnd;
          const tab = "\t";

          e.target.value =
            value.substring(0, cursorPosition) +
            tab +
            value.substring(cursorEndPosition);

          // if you modify the value programmatically, the cursor is moved
          // to the end of the value, we need to reset it to the correct
          // position again
          e.target.selectionStart = cursorPosition + 1;
          e.target.selectionEnd = cursorPosition + 1;
        }
      }}
    />
  );
};

const TABS = ["Body"];

const DataTabs = (props) => {
  const [tab, setTab] = useState("Body");

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  const tabComponent = useMemo(() => {
    switch (tab) {
      case "Headers":
        return <HeadersInput {...props} />;
      case "Body":
        return <BodyInput {...props} />;
    }
  }, [tab, props]);

  if (props.value.method === "GET" || props.value.method === "DELETE") {
    return <></>;
  }

  return (
    <>
      <Tabs value={tab} onChange={handleChange}>
        {TABS.map((tab) => (
          <Tab label={tab} key={tab} value={tab} />
        ))}
      </Tabs>
      {tabComponent}
    </>
  );
};

export const InputField = (props) => {
  return (
    <Grid container item>
      <Grid item>
        <Dropdown {...props} />
      </Grid>
      <Grid item xs={10}>
        <URLInput {...props} />
      </Grid>
      <Grid item xs>
        <Button
          disabled={props.loading}
          onClick={props.submit}
          sx={{ height: "100%" }}
          variant="contained"
        >
          {props.loading ? <CircularProgress /> : "Send"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <DataTabs {...props} />
      </Grid>
    </Grid>
  );
};
