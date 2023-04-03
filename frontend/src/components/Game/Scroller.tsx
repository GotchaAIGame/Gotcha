import React, { useState } from "react";

interface dropDownProps {
  setOpen: () => void;
  data: string[];
  locs: number[];
}

function DropDown(props: dropDownProps) {
  const { setOpen, data, locs } = props;

  const clickHandler = (idx: number) => {
    const offset = locs[idx];
    window.scrollTo({
      top: offset + window.innerHeight / 3.5,
      behavior: "smooth",
    });
  };

  return (
    <div className="dropdown-menu">
      {Array.from(data).map((item, index) => {
        return (
          <p
            onClick={() => {
              clickHandler(index);
            }}
            onKeyDown={() => {
              clickHandler(index);
            }}
            key={item}
          >
            {item}
          </p>
        );
      })}
    </div>
  );
}

function Scroller(props: { data: string[]; locs: number[] }) {
  const { data, locs } = props;
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };

  return (
    <div className="scroller-wrapper">
      <button type="button" className="scroller-button" onClick={openHandler}>
        <h1> + </h1>
      </button>
      {open && <DropDown setOpen={openHandler} data={data} locs={locs} />}
    </div>
  );
}

export default Scroller;
