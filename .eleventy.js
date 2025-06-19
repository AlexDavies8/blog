import { HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import mathjaxPlugin from "eleventy-plugin-mathjax";
import fs from "fs";
import path from "path";

export default async function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "public": "/" });

    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
    eleventyConfig.addPlugin(HtmlBasePlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(mathjaxPlugin);

    eleventyConfig.setInputDirectory("./content");
    eleventyConfig.setIncludesDirectory("../_includes");
    eleventyConfig.setDataDirectory("../_data");

    eleventyConfig.setTemplateFormats(["md", "njk", "html", "liquid", "11ty.js"]);

    eleventyConfig.addFilter("formatDate", date => {
        return new Intl.DateTimeFormat("en-GB", { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
    });

    eleventyConfig.addShortcode("render", function (filePath) {
        const relativeFilePath = path.join(path.dirname(this.page.inputPath), filePath);
        return fs.readFileSync(relativeFilePath, "utf8");
    });

    return {
        pathPrefix: "/blog/"
    }
}