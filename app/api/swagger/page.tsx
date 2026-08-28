"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import openapiSpec from "./openapi.json";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function SwaggerPage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <SwaggerUI spec={openapiSpec} />
    </div>
  );
}
