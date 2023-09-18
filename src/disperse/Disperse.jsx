/* eslint-disable no-unused-expressions */
import { useState } from "react";
import { Textarea } from "./TextArea";

export default function Disperse() {
  const [val, setVal] = useState("");
  const [amountError, setAmountError] = useState("");
  const [duplicateError, setDuplicateError] = useState([]);

  function submit() {
    setAmountError("");
    setDuplicateError("");

    const data = val?.split("\n");
    const lines = [];
    const dupErrors = [];
    data?.map((str, idx) => {
      if (isNaN(str.split(/[=, ]+/)[1])) {
        lines.push(idx + 1);
      }
    });
    if (lines?.length) {
      setAmountError(`Line: ${lines.map((x) => x)} wrong amount`);
      return false;
    } else {
      let indices = {};
      for (let i = 0; i < data.length; i++) {
        const address = data[i]?.split(/[=, ]+/)[0];
        if (!indices[address]) {
          indices[address] = [];
        }
        indices[address].push(i);
      }
      Object.keys(indices).map((key) => {
        if (indices[key].length > 1) {
          dupErrors.push(
            `Address ${key} encountered duplicate in line: ${indices[key].map(
              (idx) => idx + 1
            )}`
          );
        }
      });
      setDuplicateError(dupErrors);
    }
    if (!lines?.length && !dupErrors?.length) {
      alert("All addresses and amounts are correct");
    }
  }

  function keepTheFirstOne() {
    const data = val?.split("\n");
    let indices = {};
    let newVal = "";
    for (let i = 0; i < data.length; i++) {
      const address = data[i]?.split(/[=, ]+/)[0];
      if (!indices[address]) {
        indices[address] = data[i]?.split(/[=, ]+/)[1];
        i != 0 ? (newVal += "\n" + data[i]) : (newVal += data[i]);
      }
    }
    setVal(newVal);
    setDuplicateError([]);
  }

  function combineBalance() {
    const data = val?.split("\n");
    let indices = {};
    for (let i = 0; i < data.length; i++) {
      const address = data[i]?.split(/[=, ]+/)[0];
      if (!indices[address]) {
        indices[address] = [Number(data[i]?.split(/[=, ]+/)[1])];
      } else {
        indices[address].push(Number(data[i]?.split(/[=, ]+/)[1]));
      }
    }
    let combinedVal = "";
    Object.keys(indices)?.map((value, idx) => {
      if (idx != 0) {
        combinedVal +=
          "\n" + value + " " + indices[value]?.reduce((a, b) => a + b, 0);
      } else {
        combinedVal += value + " " + indices[value]?.reduce((a, b) => a + b, 0);
      }
    });
    setVal(combinedVal);
    setDuplicateError([]);
  }

  return (
    <div className="text-grey" style={{ minWidth: "50%" }}>
      Address with amount
      <Textarea
        name="test-textarea"
        value={val}
        onValueChange={(txt) => setVal(txt)}
        numOfLines={10}
      />
      Separated by '=', ' ', ','
      {duplicateError?.length ? (
        <div className="flex errTxt">
          Duplicate
          <div className="errTxt">
            <button onClick={keepTheFirstOne} className="duplicateBtn">
              Keep the first one
            </button>{" "}
            |{" "}
            <button onClick={combineBalance} className="duplicateBtn">
              Combine balance
            </button>
          </div>
        </div>
      ) : null}
      {amountError?.length || duplicateError?.length ? (
        <div className="error errTxt">
          <i className="fa fa-exclamation-circle erricon" />
          <div className="errTxt">
            {amountError}
            {duplicateError?.length
              ? duplicateError?.map((err) => (
                  <div className="errTxt">{err}</div>
                ))
              : null}
          </div>
        </div>
      ) : null}
      <button onClick={submit} className="nextBtn" type="button">
        Next
      </button>
    </div>
  );
}
