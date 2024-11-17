import { createSwaggerSpec } from 'next-swagger-doc';

const apiConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Your API Documentation',
    version: '1.0.0',
    description: 'Documentation for your Next.js API routes',
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://your-production-domain.com' 
        : 'http://localhost:3000',
      description: 'API server',
    },
  ],
};

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    definition: apiConfig,
    apiFolder: 'pages/api', // API folder path
  });
  return spec;
}; 