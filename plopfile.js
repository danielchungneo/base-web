module.exports = (plop) => {
  const lodash = require("lodash");
  const pluralize = require("pluralize");

  plop.setGenerator("Component", {
    description: "Create a Component",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message: "Name of Component",
      },
    ],
    actions: [
      {
        type: "add",
        path: "components/{{componentName}}/index.tsx",
        templateFile: "./config/plop-templates/components/index.tsx",
      },
      {
        type: "add",
        path: "components/{{componentName}}/{{componentName}}.tsx",
        templateFile: "./config/plop-templates/components/Component.tsx",
      },
      {
        type: "add",
        path: "components/{{componentName}}/{{componentName}}.module.scss",
        templateFile: "./config/plop-templates/components/module.scss",
      },
    ],
  });

  plop.setGenerator("Settings Page", {
    description: "Create a Settings Page",
    prompts: [
      {
        type: "input",
        name: "entityName",
        message: "Name of Entity (singular): e.g. 'ImageType'",
      },
    ],
    actions: [
      // Append API routes to entities file
      {
        type: "append",
        path: "utils/api/entities.ts",
        pattern: "Plop Pattern: Append to Entities API const",
        templateFile: "./config/plop-templates/settings/entities-api-const.tsx",
      },
      {
        type: "append",
        path: "utils/api/entities.ts",
        pattern: "Plop Pattern: Append to Entities API Export",
        templateFile:
          "./config/plop-templates/settings/entities-api-export.tsx",
      },
      // Append link to Header component
      {
        type: "append",
        path: "components/Header/Header.tsx",
        pattern: "Plop Pattern: Append to Header Settings Links",
        templateFile:
          "./config/plop-templates/settings/header-settings-link.tsx",
      },
      // Create settings page
      {
        type: "add",
        path: "pages/settings/{{kebabCasePlural entityName}}.tsx",
        templateFile: "./config/plop-templates/settings/page.tsx",
      },
      // Create List component
      {
        type: "add",
        path: "components/Lists/{{entityName}}List/index.tsx",
        templateFile: "./config/plop-templates/settings/index-list.tsx",
      },
      {
        type: "add",
        path: "components/Lists/{{entityName}}List/{{entityName}}List.tsx",
        templateFile: "./config/plop-templates/settings/ListWithFormModal.tsx",
      },
      {
        type: "add",
        path: "components/Lists/{{entityName}}List/{{entityName}}List.module.scss",
        templateFile: "./config/plop-templates/settings/module.scss",
      },
      // Create Form component
      {
        type: "add",
        path: "components/Forms/{{entityName}}Form/index.tsx",
        templateFile: "./config/plop-templates/settings/index-form.tsx",
      },
      {
        type: "add",
        path: "components/Forms/{{entityName}}Form/{{entityName}}Form.tsx",
        templateFile: "./config/plop-templates/settings/SettingsForm.tsx",
      },
      {
        type: "add",
        path: "components/Forms/{{entityName}}Form/{{entityName}}Form.module.scss",
        templateFile: "./config/plop-templates/settings/module.scss",
      },
    ],
  });

  plop.setHelper("camelCaseSingular", function (text) {
    return lodash.camelCase(pluralize.singular(text));
  });

  plop.setHelper("camelCasePlural", function (text) {
    return lodash.camelCase(pluralize.plural(text));
  });

  plop.setHelper("kebabCase", function (text) {
    return lodash.kebabCase(text).toLowerCase();
  });

  plop.setHelper("kebabCasePlural", function (text) {
    return pluralize.plural(lodash.kebabCase(text).toLowerCase());
  });

  plop.setHelper("pascalCaseSingular", function (text) {
    return pluralize.singular(lodash.startCase(text)).replace(" ", "");
  });

  plop.setHelper("pascalCasePlural", function (text) {
    return pluralize.plural(lodash.startCase(text)).replace(" ", "");
  });

  plop.setHelper("startCaseSingular", function (text) {
    return pluralize.singular(lodash.startCase(text));
  });

  plop.setHelper("startCasePlural", function (text) {
    return pluralize.plural(lodash.startCase(text));
  });

  plop.setHelper("upperCase", function (text) {
    return text.toUpperCase();
  });

  plop.setHelper("upperSnakeCaseSingular", function (text) {
    return pluralize.singular(lodash.snakeCase(text).toUpperCase());
  });
};
