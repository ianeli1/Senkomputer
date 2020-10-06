import React, { useState } from "react";
import {
  AppBar,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { useKontext } from "./index";
import { EightBit } from "./kore/EightBit";
import { Row } from "./components/Row";

const AppStyles = makeStyles((theme: Theme) => ({
  root: {},
  title: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
  },
}));

export function App() {
  const classes = AppStyles();
  const { kore, ref } = useKontext();
  const [localKore, setKore] = useState(kore);
  const updateBlock = (where: number) => {
    return (ins: number, val: number) => {
      kore.setIns(where, new EightBit(ins));
      kore.setVal(where, new EightBit(val));
      console.log(kore);
    };
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Senkomputer
          </Typography>
          <IconButton edge="end" onClick={() => setKore(kore)}>
            <Refresh />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <div>
          <canvas ref={ref} />
        </div>
        <Divider orientation="vertical" />
        <div>
          <div>
            {Object.entries(localKore.insBlock).map(([index, x]) => (
              <Row
                key={index}
                id={+index}
                ins={x.toInt()}
                val={localKore.valBlock[index].toInt()}
                onUpdate={updateBlock(+index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
