The code appears to have alignment and indentation issues because of improper formatting or a lack of consistent code styling.This can happen
if :

1. ** Code Editor Settings **: Your code editor might not have proper formatting settings enabled, such as Prettier or ESLint, which automatically format the code on save.

2. ** Manual Edits **: If the code was manually edited without adhering to a consistent style, it can lead to misaligned code.

3. ** Copy - Paste Issues **: Copying and pasting code from one source to another can sometimes introduce formatting issues, especially
if the source or destination uses different tab / space settings.

4. ** Corrupted Code **: The code might have been corrupted during a previous operation, such as merging or editing.

To fix this issue and prevent it from recurring:

    1. ** Use a Code Formatter **: Install a code formatter like Prettier in your code editor(e.g., VS Code).Configure it to format the code on save.

2. ** Linting Tools **: Use ESLint with a configuration file to enforce consistent code style.

3. ** Check Editor Settings **: Ensure your editor is set to use spaces or tabs consistently(e.g., 2 spaces or 4 spaces
    for indentation).

4. ** Validate Syntax **: Ensure the code is syntactically correct, as syntax errors can sometimes confuse formatters.

Here’ s how you can fix the indentation issues in your code using Prettier:

    1. Install Prettier:
    ``
`bash
    npm install --save-dev prettier
    `
``

2. Format the file:
    ``
`bash
    npx prettier --write client/src/App.js
    `
``

This will automatically fix the indentation and alignment issues in your file.