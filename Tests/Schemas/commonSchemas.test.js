const commonSchemas = require("../../Schemas/commonSchemas");
const validateRequest = require("../../Utils/validateRequest");

describe("Test de commonSchemas.", () => {
  describe("Test de url schema", () => {
    test("Al poner una URL inválida debe dar error", () => {
      const body = "hola";
      const { error } = validateRequest({ body }, undefined, undefined, commonSchemas.url);
      expect(error).toBeTruthy();
    });
  });
});
