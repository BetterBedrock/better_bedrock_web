#!/usr/bin/env ts-node

import { PluginMetadataGenerator } from "@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator";
import { ReadonlyVisitor } from "@nestjs/swagger/dist/plugin";
import * as fs from "fs";
import * as path from "path";

// 1) Generate metadata.ts
const generator = new PluginMetadataGenerator();
generator.generate({
    visitors: [
        new ReadonlyVisitor({
            introspectComments: true,
            pathToSource: __dirname,
        }),
    ],
    outputDir: __dirname,
    tsconfigPath: "tsconfig.json",
    watch: false,
});

console.log("🛠  metadata.ts generation kicked off. Waiting for write to finish…");

// 2) Wait a bit, then patch
setTimeout(() => {
    const metadataFile = path.join(__dirname, "metadata.ts");
    if (!fs.existsSync(metadataFile)) {
        console.error(
            "❌ metadata.ts not found after waiting—something went wrong with generation.",
        );
        process.exit(1);
    }

    let content = fs.readFileSync(metadataFile, "utf8");
    const importRegex =
        /"(\.\.\/)+packages\/constants\/(?:src\/dto\/)?([A-Za-z0-9_/.-]+)(?:\.ts)?"/g;

    // Debug: show what we're about to replace
    const matches = [...content.matchAll(importRegex)].map((m) => m[0]);
    if (matches.length === 0) {
        console.warn("⚠️ No shared-package imports matched! Here's what we saw:");
        console.warn(content.split("\n").slice(0, 20).join("\n")); // first 20 lines
        process.exit(1);
    } else {
        console.log("✅ Will replace these imports:\n", matches.join("\n"));
    }

    // Perform the replacement
    content = content.replace(importRegex, (_match, _ups, dtoPath) => {
        return `"@better-bedrock/constants/${dtoPath}"`;
    });

    // Write it back
    fs.writeFileSync(metadataFile, content, "utf8");
    console.log("🎉 metadata.ts imports rewritten to @better-bedrock/constants!");
}, 1000 /* milliseconds */);
