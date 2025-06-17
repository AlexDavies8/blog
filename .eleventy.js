import { HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import mathjaxPlugin from "eleventy-plugin-mathjax";

export default async function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "public" : "/"});

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        formats: ["avif", "webp", "jpeg"],
        widths: ["auto"],
        htmlOptions: {
            imgAttributes: {
                loading: "lazy",
                decoding: "async",
            },
            pictureAttributes: {}
        },
        svgShortCircuit: true
    });
    eleventyConfig.addPlugin(HtmlBasePlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(mathjaxPlugin);
    
    eleventyConfig.setInputDirectory("./content");
    eleventyConfig.setIncludesDirectory("../_includes");
    eleventyConfig.setDataDirectory("../_data");
    eleventyConfig.setOutputDirectory("docs")

    eleventyConfig.setTemplateFormats(["md", "njk", "html", "liquid", "11ty.js"]);

    eleventyConfig.addFilter("formatDate", date => {
        return new Intl.DateTimeFormat("en-GB", { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
    });
}