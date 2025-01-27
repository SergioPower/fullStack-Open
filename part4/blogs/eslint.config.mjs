import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config} */
export default [
    {
        files: ["**/*.js"], // Aplica a todos los archivos JavaScript
        ignores: ["node_modules/**", "dist/**", "build/**"], // Ignora estos directorios
        languageOptions: {
            globals: globals.node, // Usa las variables globales de Node.js
        },
        rules: {
            "indent": ["error", "tab"], // Usar tabulaciones para la indentación
            "no-tabs": "off", // Desactiva la regla que prohíbe tabulaciones
            "quotes": ["error", "single"], // Usar comillas simples
            "semi": ["error", "always"], // Poner punto y coma al final
            "no-mixed-spaces-and-tabs": "error", // Prohibir mezcla de espacios y tabulaciones
        },
    },
    pluginJs.configs.recommended, // Usa la configuración recomendada de ESLint
];