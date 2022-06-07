import React, { useState } from "react";
import ButtonColor from "./components/ButtonColor";
import Slider from "./components/Slider";

const TextShadow = () => {
  const [shiftRight, setShiftRight] = useState(0);
  const [shiftDown, setShiftDown] = useState(0);
  const [blur, setBlur] = useState(5);
  const [opacity, setOpacity] = useState(20);
  const [colorText, setColorText] = useState("#3D9DF6");
  const [colorBackground, setColorBackground] = useState("#FFFFFF");
  const [shadowColor, setShadowColor] = useState("#000000");
  const [select, setSelect] = useState(0);
  const [shadow, setShadow] = useState([
    `rgba(${hexToRgb(shadowColor).r},${hexToRgb(shadowColor).g},${
      hexToRgb(shadowColor).b
    },${opacity / 100}) ${shiftRight}px ${shiftDown}px ${blur}px`,
  ]);

  const handleChangeShadowColor = (color) => {
    setShadowColor(color.hex);
  };

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  const handleChangeColorText = (color) => {
    setColorText(color.hex);
  };

  const handleChangeBackgroundText = (color) => {
    setColorBackground(color.hex);
  };

  const handleAddLayer = () => {
    const newShadow = `rgba(${hexToRgb(shadowColor).r},${
      hexToRgb(shadowColor).g
    },${hexToRgb(shadowColor).b},${
      opacity / 100
    }) ${shiftRight}px ${shiftDown}px ${blur}px`;
    setShadow([...shadow, newShadow]);
  };

  const handleDeleteShadow = ({ index }) => {
    const newShadow = [...shadow];
    newShadow.splice(index, 1);
    setShadow(newShadow);
  };

  const handleChangeValueShadow = (e) => {
    const newShadow = `rgba(${hexToRgb(shadowColor).r},${
      hexToRgb(shadowColor).g
    },${hexToRgb(shadowColor).b},${
      opacity / 100
    }) ${shiftRight}px ${shiftDown}px ${blur}px`;
    shadow[select] = newShadow;
    setShadow(shadow);
  };

  return (
    <div className="flex mx-auto max-w-[1440px] w-full justify-center">
      <div className="w-2/4 max-w-[500px] bg-white mx-[10px] p-5 rounded-lg border">
        <h1 className="font-medium mb-3">Text-Shadow CSS Generator</h1>
        <div className="relative">
          <Slider
            title="Shift right"
            value={shiftRight}
            onChange={(e) => {
              setShiftRight(e.target.value);
              handleChangeValueShadow();
            }}
          />
          <Slider
            title="Shift down"
            value={shiftDown}
            onChange={(e) => {
              setShiftDown(e.target.value);
              handleChangeValueShadow();
            }}
          />
          <Slider
            title="Blur"
            min="0"
            max="100"
            value={blur}
            onChange={(e) => {
              setBlur(e.target.value);
              handleChangeValueShadow();
            }}
          />
          <Slider
            title="Opacity"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => {
              setOpacity(e.target.value);
              handleChangeValueShadow();
            }}
          />
          <div className="relative">
            <ButtonColor
              className="left-0"
              onChange={handleChangeShadowColor}
              colorPicker={shadowColor}
            ></ButtonColor>
          </div>
        </div>
        <div className="border-t-2 mt-5">
          <button
            className="p-3 rounded-lg border my-5"
            onClick={handleAddLayer}
          >
            Add layer
          </button>
          {shadow.map((item, index) => {
            return (
              <div
                className={`p-3 flex justify-between ${
                  select === index ? "bg-[#5C6AC4] text-white" : ""
                }`}
                key={index}
                onClick={() => {
                  setSelect(index);
                }}
              >
                <p index={index}>{item}</p>
                {shadow.length > 1 ? (
                  <p
                    className="text-red-500 cursor-pointer"
                    onClick={handleDeleteShadow}
                  >
                    Delete
                  </p>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-2/4 max-w-[500px] mx-5 relative">
        <div className="mb-5 rounded-lg border bg-white">
          <div className="absolute top-5 right-5">
            <ButtonColor
              onChange={handleChangeBackgroundText}
              colorPicker={colorBackground}
            ></ButtonColor>
            <ButtonColor
              onChange={handleChangeColorText}
              colorPicker={colorText}
            ></ButtonColor>
          </div>
          <h1 className="text-lg font-medium mb-3 pt-5 px-5">Preview</h1>
          <div className="" style={{ backgroundColor: `${colorBackground}` }}>
            <h1
              style={{ textShadow: `${shadow}`, color: `${colorText}` }}
              className="text-[80px] px-5"
            >
              Hello SC
            </h1>
          </div>
        </div>
        <div className="border p-5 bg-white rounded-lg mb-5 min-h-[150px]">
          <p className="font-medium">CSS Code</p>
          <div className="py-5">
            <code>{`text-shadow: ${shadow
              .map((item) => item)
              .join(", ")}`}</code>
          </div>
        </div>
        <div className="border p-5 bg-white rounded-lg">
          <p className="font-medium">Template</p>
        </div>
      </div>
    </div>
  );
};

export default TextShadow;
