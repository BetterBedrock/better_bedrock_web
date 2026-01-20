import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Boundaries rules
  // {
  //   plugins: {
  //     boundaries,
  //   },

  //   settings: {
  //     "boundaries/include": ["src/**/*"],
  //     "boundaries/elements": [
  //       {
  //         mode: "full",
  //         type: "shared",
  //         pattern: [
  //           "src/components/**/*",
  //           "src/utils/**/*",
  //           "src/services/**/*",
  //           "src/hooks/**/*",
  //           "src/lib/**/*",
  //           "src/server/**/*",
  //           "src/providers/**/*",
  //           "src/features/shared/**/*",
  //         ],
  //       },
  //       {
  //         mode: "full",
  //         type: "feature",
  //         capture: ["featureName"],
  //         pattern: ["src/features/*/**/*"],
  //       },
  //       {
  //         mode: "full",
  //         type: "app",
  //         capture: ["_", "fileName"],
  //         pattern: ["src/app/**/*"],
  //       },
  //       {
  //         mode: "full",
  //         type: "neverImport",
  //         pattern: ["src/*", "src/tasks/**/*"],
  //       },
  //     ],
  //   },

  //   rules: {
  //     "boundaries/no-unknown": "error",
  //     "boundaries/no-unknown-files": "error",
  //     "boundaries/element-types": [
  //       "error",
  //       {
  //         default: "disallow",
  //         rules: [
  //           {
  //             from: ["shared"],
  //             allow: ["shared"],
  //           },
  //           {
  //             from: ["feature"],
  //             allow: [
  //               "shared",
  //               ["feature", { featureName: "${from.featureName}" }],
  //             ],
  //           },
  //           {
  //             from: ["app", "neverImport"],
  //             allow: ["shared", "feature"],
  //           },
  //           {
  //             from: ["app"],
  //             allow: [["app", { fileName: "*.scss" }]],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
