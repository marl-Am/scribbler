import type { NextApiRequest } from "next";

interface NextApiRequestWithRawBody extends NextApiRequest {
  rawBody?: string;
}

export default function captureRawBody(req: NextApiRequestWithRawBody) {
  return new Promise<void>((resolve) => {
    let rawBody = "";

    req.on("data", (chunk) => {
      rawBody += chunk;
    });

    req.on("end", () => {
      req.rawBody = rawBody;
      resolve();
    });
  });
}
