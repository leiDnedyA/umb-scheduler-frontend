import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
    spec: any;
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
    const spec = createSwaggerSpec({
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Your API Documentation',
                version: '1.0.0',
                description: 'Documentation for your Next.js API routes',
            },
            servers: [
                {
                    url: `http://localhost:${process.env.PORT || 3000}`
                },
            ],
        },
        apiFolder: 'pages/api',
    });

    return {
        props: {
            spec,
        },
    };
};

export default ApiDoc;
