import {
  Card,
  Typography,
  TextField,
  Divider,
  Fade,
  IconButton,
} from "@material-ui/core";
import { Save, Refresh } from "@material-ui/icons";
import React, { useState, useEffect } from "react";

interface RowProps {
  ins: number;
  val: number;
  onUpdate: (ins: number, val: number) => void;
  id: number;
}

export function Row(props: RowProps) {
  const [localIns, setIns] = useState(props.ins);
  const [localVal, setVal] = useState(props.val);

  useEffect(() => {
    setIns(props.ins);
    setVal(props.val);
  }, [props.ins, props.val]);

  function setNumber(fn: (val: number) => void, newVal: string) {
    const numRegex = /^[0-9]+$/;
    if (numRegex.test(newVal)) {
      fn(parseInt(newVal));
    } else if (!newVal) {
      fn(0);
    } else {
      console.log("invalid character");
    }
  }

  return (
    <Card style={{ display: "flex", flexDirection: "row" }}>
      <Typography
        variant="h6"
        style={{
          padding: 4,
          background: "#d3d3d3",
          borderRadius: 4,
          margin: 4,
        }}
      >
        {props.id}
      </Typography>
      <Typography variant="body1">INS:</Typography>
      <TextField
        value={localIns}
        onChange={(e) => void setNumber(setIns, e.target.value)}
      />
      <Divider orientation="vertical" />
      <Typography variant="body1">VAL:</Typography>
      <TextField
        value={localVal}
        onChange={(e) => void setNumber(setVal, e.target.value)}
      />
      <Fade in={localIns != props.ins || localVal != props.val}>
        <div>
          <IconButton onClick={() => void props.onUpdate(localIns, localVal)}>
            <Save />
          </IconButton>
          <IconButton
            onClick={() => {
              setIns(props.ins);
              setVal(props.val);
            }}
          >
            <Refresh />
          </IconButton>
        </div>
      </Fade>
    </Card>
  );
}
