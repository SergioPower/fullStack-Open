import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config} */
export default [
    {
        files: ["**/*.js"], // Aplica a todos los archivos JavaScript
        languageOptions: {
            globals: globals.node, // Usa las variables globales de Node.js
        },
        rules: {
            "indent": ["error", "tab"], // Usar tabulaciones en lugar de espacios
            "no-tabs": "off", // Desactiva la regla que prohíbe tabulaciones
            "quotes": ["error", "single"], // Usar comillas simples
            "semi": ["error", "always"], // Poner punto y coma al final
            "no-multiple-empty-lines": ["error", { max: 1 }], // Máximo 1 línea vacía al final
        },
    },
    pluginJs.configs.recommended, // Usa la configuración recomendada de ESLint
];