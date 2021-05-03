# Senkomputer

A virtual CPU core capable of basic mathematics, 20 col text and basic pixel rendering using a custom instruction set.

The default configuration has 16 bytes of cache, 8 used for instructions and the other 8 for storing values. The accumulator consists of 2 bytes of memory and is able to store a number up to 65536. The implemented ALU can't use the carry part of the accumulator, if it's invoked it'll use the last 8 bits of the accumulator and the current value cache space determined by the counter.

Every instruction is supposed to be paired to its own value (or not, depending on the instruction), so treat "this" as the current value read.

ACC = normal accumulator value
CarryACC = carry accumulator value
(R) reserved for future implementation

## Instruction List|

### Memory manipulation

| INS | Action                                        |
| --- | --------------------------------------------- |
| 0   | skip this clock.                              |
| 1   | (R) skip this clock.                          |
| 2   | clear this cache value slot.                  |
| 3   | save the current ACC to this value slot.      |
| 4   | store this value to ACC.                      |
| 5   | save the current CarryACC to this value slot. |
| 6   | store this value to CarryACC.                 |
| 7   | jump to this instruction.                     |
| 8   | jump to this instruction if ACC == 1.         |

### ALU

| INS | Action                                          |
| --- | ----------------------------------------------- |
| 9   | (R) skip this clock                             |
| 10  | add this to ACC.                                |
| 11  | set ACC to the difference between ACC and this. |
| 12  | set ACC to the difference between this and ACC. |
| 13  | set ACC to the product of ACC and this.         |
| 14  | set ACC to the quotient of ACC and this.        |
| 15  | (R) skip this clock [full div].                 |
| 16  | (R) skip this clock.                            |
| 17  | (R) skip this clock.                            |
| 18  | and.                                            |
| 19  | or.                                             |
| 20  | xor.                                            |
| 21  | not.                                            |
| 22  | (R) skip this clock [shift <<].                 |
| 23  | (R) skip this clock [shift >>].                 |
| 24  | is ACC smaller than this.                       |
| 25  | is ACC greater than this.                       |
| 26  | (R) skip this clock.                            |

### RAM

| INS | Action                                           |
| --- | ------------------------------------------------ |
| 27  | request this address of RAM.                     |
| 28  | write the current blocks to this address of RAM. |
| 29  | (R) skip this clock.                             |
| 30  | (R) skip this clock.                             |
| 31  | (R) skip this clock.                             |

### AUX PORTS - (There's nothing "connected" to these ports by default)

| INS | Action             |
| --- | ------------------ |
| 32  | set ACC to PORT0.  |
| 33  | set PORT0 to this. |
| 34  | set ACC to PORT1.  |
| 35  | set PORT1 to this. |
| 36  | set ACC to PORT2.  |
| 37  | set PORT2 to this. |

### EEPROM - NYI

| INS | Action                                          |
| --- | ----------------------------------------------- |
| 38  | set ACC to the value of this address of EEPROM. |
| 39  | set this address of EEPROM to ACC.              |

### VIDEO -

| INS | Action                                   |
| --- | ---------------------------------------- |
| 40  | set video mode flag to this, default = 0 |
| 41  | clear screen.                            |
| 42  | render to vram and update display.       |
| 43  | (R) skip this clock.                     |
| 44  | (R) skip this clock.                     |

#### VIDEO MODE 0 -

| INS | Action                                                                                     |
| --- | ------------------------------------------------------------------------------------------ |
| 45  | go to this line.                                                                           |
| 46  | go to this column.                                                                         |
| 47  | print this ASCII character.                                                                |
| 48  | print this ASCII character and move to the next column or line if there's no columns left. |
| 49  | clear text memory.                                                                         |
| 50  | (R) skip this clock.                                                                       |
| 51  | (R) skip this clock.                                                                       |

#### VIDEO MODE 1 - NYI

| INS   | Action               |
| ----- | -------------------- |
| 52~70 | (R) skip this clock. |

### Extra

| INS | Action                             |
| --- | ---------------------------------- |
| 71  | [DEBUG] console.log("Hello world") |

## Other info

### KASCII

| Number | Letter | Number | Letter | Number | Letter | Number | Letter |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 65     | A      | 66     | B      | 67     | C      | 68     | D      |
| 69     | E      | 70     | F      | 71     | G      | 72     | H      |
| 73     | I      | 74     | J      | 75     | K      | 76     | L      |
| 77     | M      | 78     | N      | 79     | O      | 80     | P      |
| 81     | Q      | 82     | R      | 83     | S      | 84     | T      |
| 85     | U      | 86     | V      | 87     | W      | 88     | X      |
| 89     | Y      | 90     | Z      | tbd    | tbd    | tbd    | tbd    |

### .kore file upload

Senkomputer now supports the upload of .kore files, the files are simple text files and are formatted in the following way

```ts
<instruction integer> <value integer> <instruction integer> <value integer> <instruction integer> <value integer> <instruction integer> <value integer> ...
```

They will overwrite the RAM blocks and the first RAM block with automatically overwrite the INS and VAL blocks
