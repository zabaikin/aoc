import { readFileSync } from "fs";
export const getStringFromFile = () => {
    return require("fs").readFileSync(
        require("path").resolve(__dirname, "./input.txt"),
        "utf-8")
}