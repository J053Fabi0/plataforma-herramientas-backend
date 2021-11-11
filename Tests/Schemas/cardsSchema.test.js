const cardsSchema = require("../../Schemas/cardsSchema");

describe("Test de cardsSchema.", () => {
  describe("Test getCard", () => {
    test("Al dar un ID inválido debe dar un error", () => {
      const { error } = cardsSchema.getCard({ query: { id: "no válido" } });
      expect(error).toBeTruthy();
    });
    test("Al dar un ID válido no debe haber error", () => {
      const { error } = cardsSchema.getCard({ query: { id: "618bdcd71f08d709367a381d" } });
      expect(error).toBeFalsy();
    });
  });

  describe("Test deleteCard", () => {
    test("Al dar un ID inválido debe dar un error", () => {
      const { error } = cardsSchema.deleteCard({ body: { id: "no válido" } });
      expect(error).toBeTruthy();
    });
    test("Al dar un ID válido no debe haber error", () => {
      const { error } = cardsSchema.deleteCard({ body: { id: "618bdcd71f08d709367a381d" } });
      expect(error).toBeFalsy();
    });
  });

  describe("Test postCreateCard", () => {
    describe("Al poner un dato inválido en 'types'", () => {
      test("Debe dar un error", () => {
        const body = {
          title: "Título",
          prueba: {
            types: ["raro"],
          },
        };
        const { error } = cardsSchema.postCreateCard({ body });
        expect(error).toBeTruthy();
      });
    });

    describe("Al usar una opción en 'pruebas' pero no especificarla en 'types'", () => {
      test("Debe eliminarla automáticamente", () => {
        const pruebas = [
          {
            types: ["images"],
            images: ["https://a.com"],
            text: "Hola",
          },
          {
            types: ["video"],
            video: { url: "https://a.com", type: "direct" },
            text: "Hola",
          },
        ];
        const body = {
          title: "Título",
        };
        for (let prueba of pruebas) {
          body.prueba = prueba;
          const { error } = cardsSchema.postCreateCard({ body });
          expect(error).toBeTruthy();
        }
      });
    });

    describe("Al poner 'text' en 'types'", () => {
      test("Debe pedir el elemento 'text'", () => {
        const body = {
          title: "Título",
          prueba: {
            types: ["text"],
          },
        };
        const { error } = cardsSchema.postCreateCard({ body });
        expect(error).toBeTruthy();
      });
      test("Es incorrecto", () => {
        const textValues = [[], ["a"]];
        const body = {
          title: "Título",
          prueba: {
            types: ["text"],
          },
        };
        for (let textValue of textValues) {
          body.prueba.text = textValue;
          const { error } = cardsSchema.postCreateCard({ body });
          expect(error).toBeTruthy();
        }
      });
      test("Es correcto", () => {
        const body = {
          title: "Título",
          prueba: {
            types: ["text"],
            text: "text",
          },
        };
        const { error } = cardsSchema.postCreateCard({ body });
        expect(error).toBeFalsy();
      });
    });

    describe("Al poner 'images' en 'types'", () => {
      test("Debe pedir el elemento 'images'", () => {
        const body = {
          title: "Título",
          prueba: {
            types: ["images"],
          },
        };
        const { error } = cardsSchema.postCreateCard({ body });
        expect(error).toBeTruthy();
      });
      test("Es incorrecto", () => {
        const imagesValues = [[], ["a"]];
        const body = {
          title: "Título",
          prueba: {
            types: ["images"],
          },
        };
        for (let imagesValue of imagesValues) {
          body.prueba.images = imagesValue;
          const { error } = cardsSchema.postCreateCard({ body });
          expect(error).toBeTruthy();
        }
      });
      test("Es correcto", () => {
        const body = {
          title: "Título",
          prueba: {
            types: ["images"],
            images: ["https://a.com"],
          },
        };
        const { error } = cardsSchema.postCreateCard({ body });
        expect(error).toBeFalsy();
      });
    });

    describe("Al poner 'video' en 'types'", () => {
      test("Debe pedir el elemento 'video'", () => {
        const body = {
          title: "Título",
          prueba: {
            types: ["video"],
          },
        };
        const { error } = cardsSchema.postCreateCard({ body });
        expect(error).toBeTruthy();
      });

      test("Si 'video' es incorrecto", () => {
        const videoValues = [
          { url: "nada" },
          { url: "nada", type: "raro" },
          { type: "raro" },
          { type: "direct" },
          { url: "https://a.com" },
          { url: "nada", type: "direct" },
          { url: "https://e.g.com/BigBuckBunny.mp4", type: "youtube" },
        ];
        const body = {
          title: "Título",
          prueba: {
            types: ["video"],
          },
        };
        for (let videoValue of videoValues) {
          body.prueba.video = videoValue;
          const { error } = cardsSchema.postCreateCard({ body });
          expect(error).toBeTruthy();
        }
      });

      test("Si 'video' es correcto", () => {
        const videoValues = [
          { url: "https://e.g.com/BigBuckBunny.mp4", type: "direct" },
          { url: "https://youtu.be/DFYRQ_zQ-gk", type: "youtube" },
        ];
        const body = {
          title: "Título",
          prueba: {
            types: ["video"],
          },
        };
        for (let videoValue of videoValues) {
          body.prueba.video = videoValue;
          const { error } = cardsSchema.postCreateCard({ body });
          expect(error).toBeFalsy();
        }
      });
    });
  });
});
