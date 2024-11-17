import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};
/**
 * @swagger
 * /api/parse_audit:
 *   post:
 *     summary: Parse a degree audit PDF file
 *     description: Uploads a degree audit PDF file and returns parsed course and requirement data
 *     tags:
 *       - Audit
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The degree audit PDF file to parse
 *     responses:
 *       200:
 *         description: Successfully parsed audit data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     entry_data:
 *                       type: array
 *                       items:
 *                         type: object
 *                     req_data:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Bad request - No file uploaded or invalid audit data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       405:
 *         description: Method not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.AUDIT_PARSE_API_URL) {
    return res.status(500).json({ error: 'AUDIT_PARSE_API_URL environment variable is not set' });
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    
    if (!files.file?.[0]) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = files.file[0];
    const fileData = await fs.readFile(file.filepath);
    
    const formData = new FormData();
    formData.append('file', new Blob([fileData]), file.originalFilename || 'audit.pdf');

    const response = await fetch(process.env.AUDIT_PARSE_API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to parse audit. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data === null || !data?.data?.entry_data || data.data.entry_data.length === 0 || !data?.data?.req_data || data.data.req_data.length === 0) {
      return res.status(400).json({ error: 'Invalid audit data.' });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('Error parsing audit:', error);
    return res.status(500).json({ error: 'Failed to parse audit' });
  }
}
