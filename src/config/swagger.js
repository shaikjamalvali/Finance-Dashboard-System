const swaggerJSDoc = require("swagger-jsdoc");

function buildSwaggerSpec() {
  return swaggerJSDoc({
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Role-Based Finance Dashboard Backend API",
        version: "1.0.0",
        description: [
          "Finance Data Processing and Access Control Backend.",
          "",
          "Submission prepared for Zorvyn Assignment Portal.",
          "Candidate: Jamal Vali Shaik",
          "Email: shaikjamalvali2004@gmail.com",
          "Role: Backend Developer Intern",
          "",
          "This backend satisfies the assignment scope with:",
          "- User and role management (admin, analyst, viewer)",
          "- Financial records CRUD with filtering, pagination, and validation",
          "- Dashboard aggregation APIs (summary, category totals, trends, recent activity)",
          "- Role-based access control at route level",
          "- Input validation and structured error handling",
          "- MongoDB persistence with Mongoose",
          "- Optional enhancements: JWT auth, cookie auth, rate limiting, Swagger docs"
        ].join("\n"),
        contact: {
          name: "Jamal Vali Shaik",
          email: "shaikjamalvali2004@gmail.com"
        }
      },
      servers: [
        {
          url: process.env.SWAGGER_SERVER_URL || "/"
        }
      ],
      tags: [
        {
          name: "System",
          description: "Health and operational endpoints"
        },
        {
          name: "Auth",
          description: "User registration and login"
        },
        {
          name: "Users",
          description: "User lifecycle and access-level management (admin only)"
        },
        {
          name: "Records",
          description: "Financial records CRUD and filtering"
        },
        {
          name: "Dashboard",
          description: "Aggregated analytics for finance dashboard"
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        },
        schemas: {
          ErrorResponse: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Validation failed"
              },
              details: {
                type: "array",
                items: {
                  type: "string"
                },
                example: ["\"email\" is required"]
              }
            }
          },
          User: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "660d4eb378f8e4c8f84f2af1"
              },
              name: {
                type: "string",
                example: "Jamal Vali Shaik"
              },
              email: {
                type: "string",
                format: "email",
                example: "shaikjamalvali2004@gmail.com"
              },
              role: {
                type: "string",
                enum: ["admin", "analyst", "viewer"],
                example: "admin"
              },
              status: {
                type: "string",
                enum: ["active", "inactive"],
                example: "active"
              }
            }
          },
          Record: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                example: "660d4f6f78f8e4c8f84f2b10"
              },
              amount: {
                type: "number",
                example: 1250
              },
              type: {
                type: "string",
                enum: ["income", "expense"],
                example: "income"
              },
              category: {
                type: "string",
                example: "Consulting"
              },
              date: {
                type: "string",
                format: "date-time",
                example: "2026-03-10T00:00:00.000Z"
              },
              notes: {
                type: "string",
                example: "Client invoice payment"
              },
              createdBy: {
                type: "string",
                example: "660d4eb378f8e4c8f84f2af1"
              }
            }
          }
        },
        responses: {
          UnauthorizedError: {
            description: "Missing, invalid, or expired authentication token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                },
                example: {
                  message: "Authorization token is required"
                }
              }
            }
          },
          ForbiddenError: {
            description: "Authenticated user lacks permission for this action",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                },
                example: {
                  message: "You are not allowed to perform this action"
                }
              }
            }
          }
        }
      },
      security: [{ bearerAuth: [] }]
    },
    apis: ["./src/routes/*.js", "./src/app.js"]
  });
}

module.exports = buildSwaggerSpec;
