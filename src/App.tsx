import React, { useRef, useState } from "react";
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
import { Eject, PlayArrow } from "@material-ui/icons";
import { EightBit } from "./kore/EightBit";
import { Row } from "./components/Row";
import { Kore } from "./kore";
import { CanvasHandler } from "./CanvasHandler";
import { fillRAMBlockWithText } from "./kore/memory";

const AppStyles = makeStyles((theme: Theme) => ({
  root: {},
  title: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
  },
}));

type table = { ins: number; val: number }[];

function koreToTable(kore: Kore) {
  return Object.entries(kore.insBlock).reduce(
    (acc, [key, value]: [string, EightBit]) => [
      ...acc,
      { ins: value.toInt(), val: kore.valBlock[key].toInt() as number },
    ],
    [] as table
  );
}

export function App() {
  const classes = AppStyles();
  const canvas = useRef(new CanvasHandler());
  const { current: kore } = useRef(new Kore(16, canvas.current));
  const updateBlock = (where: number) => {
    return (ins: number, val: number) => {
      kore.setIns(where, new EightBit(ins));
      kore.setVal(where, new EightBit(val));
      setTable(koreToTable(kore));
    };
  };
  const [table, setTable] = useState(koreToTable(kore));

  const onRun = () => {
    kore.clk();
    setTable(koreToTable(kore));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Senkomputer
          </Typography>
          <IconButton edge="end" onClick={onRun}>
            <PlayArrow />
          </IconButton>

          <IconButton edge="end">
            <label htmlFor="InputButton">
              <input
                type="file"
                accept=".kore"
                id="InputButton"
                hidden
                onChange={(e) => {
                  e.preventDefault();
                  e.target.files
                    ?.item(0)
                    ?.text()
                    .then((data) => {
                      if (data) {
                        fillRAMBlockWithText(data, kore.RAM);
                        kore.insBlock = kore.RAM[0].getInsBlock();
                        kore.valBlock = kore.RAM[0].getValBlock();
                        setTable(koreToTable(kore));
                        console.log(data);
                      } else {
                        console.log("error lol");
                      }
                    });
                }}
              />
              <Eject />
            </label>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <div>
          <canvas
            style={{ background: "#000100", width: 800, height: 400 }}
            ref={(x) => x && canvas.current.setCanvas(x)}
          />
        </div>
        <Divider orientation="vertical" />
        <div>
          <div>
            {table.map(({ val, ins }, i) => (
              <Row
                key={i}
                id={i}
                ins={ins}
                val={val}
                onUpdate={updateBlock(i)}
                selected={kore.counter == i}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
