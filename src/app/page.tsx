"use client";

import * as React from "react";
import NextImage, { StaticImageData } from "next/image";
import localFont from "next/font/local";
import { UAParser } from "ua-parser-js";

import bagelme from "./images/bagelme.jpg";
import catchingvibes from "./images/catchingvibes.jpg";
import doloisdry from "./images/doloisdry.jpg";
import grandslam from "./images/grandslam.jpg";
import heartrally from "./images/heart-rally.jpg";
import linedolo from "./images/line-dolo.jpg";
import lovelovenet from "./images/love-love-net.jpg";
import niceace from "./images/niceace.jpg";
import perfectmatch from "./images/perfectmatch.jpg";
import servinglooks from "./images/servinglooks.jpg";
import urcourt from "./images/urcourt.jpg";
import vv from "./images/v&vv.jpg";

const newSpirit = localFont({ src: "./font/NewSpirit.ttf" });

const ImageButton = ({
  src,
  setActiveImage,
  activeImage,
}: {
  src: StaticImageData;
  setActiveImage: (src: StaticImageData) => void;
  activeImage: StaticImageData;
}) => {
  return (
    <NextImage
      className={`border-2 ${
        activeImage === src ? "border-green-800" : "border-transparent"
      }`}
      alt={"image"}
      src={src}
      width={100}
      height={100}
      onClick={() => {
        setActiveImage(src);
      }}
    />
  );
};

export default function Home() {
  const [activeImage, setActiveImage] = React.useState(bagelme);
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const generateCard = React.useCallback(
    async (activeImage) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1398;

      const context = canvas.getContext("2d");

      const img = new Image();
      img.src = activeImage.src;

      img.onload = () => {
        if (context == null) return;

        context.drawImage(img, 0, 0);
        context.font = `70px ${newSpirit.style.fontFamily}`;

        context.fillStyle = "#166534";
        context.fillText(from, 190, 1355);
        context.fillText(to, 740, 1355);

        const { device } = UAParser(navigator.userAgent);

        if (device.is("mobile")) {
          canvas.toBlob(async (blob) => {
            // Even if you want to share just one file you need to
            // send them as an array of files.
            const files = [
              new File([blob], "valentines.jpg", { type: blob.type }),
            ];
            const shareData = {
              text: `From ${from} to ${to}`,
              title: "Valentine's",
              files,
            };
            if (navigator.canShare(shareData)) {
              try {
                await navigator.share(shareData);
              } catch (err) {
                if (err.name !== "AbortError") {
                  console.error(err.name, err.message);
                }
              }
            } else {
              console.warn("Sharing not supported", shareData);
            }
          });
        } else {
          const image = canvas.toDataURL("image/jpg");
          const link = document.createElement("a");
          link.download = `valentines.jpg`;
          link.href = image;
          link.click();
        }
      };
    },
    [from, to]
  );

  return (
    <div
      className={`${newSpirit.className} flex flex-col gap-4 py-4 max-w-[540px] mx-auto`}
    >
      <div className="flex justify-center">
        <h1 className="text-3xl text-green-800">
          TMAC Valentine Card Generator
        </h1>
      </div>
      <div
        className="flex flex-row gap-2 max-w-full p-4 overflow-auto [&::-webkit-scrollbar]:h-[4px]
  [&::-webkit-scrollbar-track]:bg-gray-200
  [&::-webkit-scrollbar-thumb]:bg-green-900"
      >
        <ImageButton
          src={bagelme}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={catchingvibes}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={doloisdry}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={grandslam}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={heartrally}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={linedolo}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={lovelovenet}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={niceace}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={perfectmatch}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={servinglooks}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={urcourt}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
        <ImageButton
          src={vv}
          setActiveImage={setActiveImage}
          activeImage={activeImage}
        />
      </div>
      <div className="flex justify-center px-4">
        <div className="relative">
          <NextImage
            src={activeImage}
            width={500}
            height={647}
            alt="TMAC Card"
          />
          <div className="absolute bottom-[1.8%] left-[18%]">
            <input
              autoFocus
              className="appearance-none bg-transparent text-green-800 text-2xl min-[530px]:text-3xl outline-none"
              value={from}
              onChange={(evt) => setFrom(evt.target.value)}
            />
          </div>
          <div className="absolute bottom-[1.8%] right-[7%] w-[25%] ">
            <input
              className="appearance-none bg-transparent text-green-800 text-2xl min-[530px]:text-3xl outline-none w-full"
              value={to}
              onChange={(evt) => setTo(evt.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-green-800 text-white px-4 py-2 rounded-md"
          onClick={() => {
            generateCard(activeImage);
          }}
        >
          Download Card
        </button>
      </div>
    </div>
  );
}
