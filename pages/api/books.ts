// pages/api/requestBooks.ts

import type { NextApiRequest, NextApiResponse } from "next";

interface Course {
  program_code: string;
  course_id: string;
  section_number: string;
}

const requestBooks = async (courses: Course[]) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
  );
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Cookie",
    "dtCookie=v_4_srv_9_sn_218F8D4D2FC5D82D30336390DAAF3667_perc_100000_ol_0_mul_1_app-3A45f2676e29f53eb9_1_rcs-3Acss_0; x_efollett_uuid=244e6c3e-a38a-11ef-913e-42010ad24986; GCLB=CMb5wovT4MeT5wEQAw; _pxhd=Q3BvyEBLFvRwI4Gw/eCgQeO65074TajJ/0afGvKBCic4zCEa-/m5GX4PAv-XdAskf6V2F11/W-icAO///kQRLg==:nAXu1xJODFRkhSSpweOuv9Gwym83gvH1GCbvuXqRDuUeq/w77t7nw0NCAFaqaDpYEMgxxskdgelkRZe3m6DAh7fNHxbzwHBIrNa5jJjGqHc="
  );

  const courses_list = courses.map((item) => ({
    divisionDisplayName: "",
    departmentDisplayName: item.program_code.toUpperCase(),
    courseDisplayName: item.course_id,
    sectionDisplayName: item.section_number,
    secondaryvalues: `${item.program_code.toUpperCase()}/${item.course_id}/${item.section_number}`,
  }));

  const raw = JSON.stringify({
    courses: courses_list,
    programId: "512",
    storeId: "10348",
    termId: "100085139",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "manual" as RequestRedirect,
  };

  const response = await fetch(
    "https://svc.bkstr.com/courseMaterial/results?storeId=10348&langId=-1&catalogId=11077&requestType=DDCSBrowse",
    requestOptions
  );

  return response.json();
};
/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Request books based on course information
 *     description: This endpoint accepts a list of courses and returns book information from an external API.
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 program_code:
 *                   type: string
 *                   description: The program code of the course (e.g., "CS").
 *                   example: "CS"
 *                 course_id:
 *                   type: string
 *                   description: The course ID (e.g., "210").
 *                   example: "210"
 *                 section_number:
 *                   type: string
 *                   description: The section number of the course.
 *                   example: "01"
 *     responses:
 *       200:
 *         description: Successfully fetched book information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the request.
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   description: The book information returned by the external API.
 *       400:
 *         description: Bad request. The input data is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 *                   example: "Invalid request body. Expected an array of courses."
 *       405:
 *         description: Method not allowed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 *                   example: "Method GET not allowed"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 *                   example: "Internal Server Error"
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return;
  }

  try {
    const courses: Course[] = req.body;

    if (!Array.isArray(courses)) {
      res.status(400).json({ error: "Invalid request body. Expected an array of courses." });
      return;
    }

    const response = await requestBooks(courses);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
