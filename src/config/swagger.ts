import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for products",
    },
  },

  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link{
      content: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe_Jxe7HjlmIBqVNqGQGbYjxdZd28bi3njFg&s');
      height: 150px;
      width: auto;
    }
  `,
  customSiteTitle: "Documentación REST API Express / Typescript",
};

export default swaggerSpec;
export { swaggerUiOptions };
