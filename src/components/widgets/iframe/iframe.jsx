import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

import Container from "../widget/container";
import Raw from "../widget/raw";

const textSizes = {
  "4xl": "text-4xl",
  "3xl": "text-3xl",
  "2xl": "text-2xl",
  xl: "text-xl",
  lg: "text-lg",
  md: "text-md",
  sm: "text-sm",
  xs: "text-xs",
};

export default function IFrame({ options }) {
  const { uri, width, height } = options;

  return (
    <Container options={options}>
      <Raw>
        <div className="flex flex-row items-center grow justify-end">
          <iframe src={uri} width={width} height={height} />
        </div>
      </Raw>
    </Container>
  );
}
