/* ============================================================
   LA OFRENDA TAQUERÍA · DATOS DE LA CARTA
   Este archivo es lo ÚNICO que cambia cuando cambian precios o platillos.
   Se edita con admin.html (descarga un archivo nuevo) o a mano.
   · visible:false  → el platillo no aparece en la carta pública
   · propuesta:true → sugerencia de Creatino, pendiente de aprobar
   ============================================================ */
window.CARTA = {
  meta: {
    actualizado: "2026-10-09",
    moneda: "EUR",
    // Horario del local (0 = domingo … 6 = sábado), hora de Valencia. Lo usa el selector de recogida de guisos.
    horario: { "0": ["13:30-16:00", "19:30-23:00"], "1": [], "2": [], "3": ["19:30-23:00"], "4": ["19:30-23:00"], "5": ["13:30-16:00", "19:30-23:00"], "6": ["13:30-16:00", "19:30-23:00"] },
    recogidaCadaMin: 30,
    recogidaMargenAbrir: 30,   // la primera hora de recogida es 30 min después de abrir
    recogidaMargenCerrar: 30,  // la última, 30 min antes de cerrar
    impuestos: { es: "Impuestos incluidos en el precio.", en: "Taxes included in the price." },
    whatsapp: "34603829035",
    // Rango automático del tequila/mezcal según precio del chupito de 2 oz
    tiers: { economico: 7, top: 10 }   // < 7 económico · < 10 top · ≥ 10 premium
  },

  alergenos: {
    lacteos: { es: "Lácteos", en: "Dairy" },
    gluten:  { es: "Gluten",  en: "Gluten" },
    soja:    { es: "Soja",    en: "Soy" },
    huevo:   { es: "Huevo",   en: "Egg" }
  },

  categorias: [
    {
      id: "entrantes", nombre: { es: "Entrantes", en: "Starters" },
      grupos: [{ items: [
        { id: "guacamole-torreznos", foto: "assets/img/guacamole-torreznos.jpg", nombre: { es: "Guacamole con torreznos", en: "Guacamole with pork crackling" },
          desc: { es: "Cremoso guacamole casero, acompañado de torreznos y totopos.", en: "Creamy house-made guacamole served with pork crackling and tortilla chips." },
          precio: 11.20, popular: true },
        { id: "nachos-mix", foto: "assets/img/nachos-mix-carne.jpg", nombre: { es: "Nachos con mix de carne", en: "Nachos with meat mix" },
          desc: { es: "Totopos bañados con salsa de queso cheddar, frijoles negros, pico de gallo, guacamole y nuestro mix de tres proteínas: pastor, asada, cochinita.", en: "Tortilla chips with cheddar cheese sauce, black beans, pico de gallo, guacamole and our three-meat mix: pastor, asada, cochinita." },
          precio: 12.50, alergenos: ["lacteos"] },
        { id: "fundido-chorizo", foto: "assets/img/fundido-chorizo.jpg", nombre: { es: "Fundido queso con chorizo", en: "Melted cheese with chorizo" },
          desc: { es: "Mix de quesos, mozzarella, Oaxaca y fresco. Gratinados con chorizo mexicano (acompañado de 4 tortillas de maíz).", en: "Cheese blend of mozzarella, Oaxaca and fresh cheese, gratinated with Mexican chorizo (served with 4 corn tortillas)." },
          precio: 11.00, alergenos: ["lacteos"] },
        { id: "fundido-setas", foto: "assets/img/fundido-setas.jpg", nombre: { es: "Fundido queso con setas", en: "Melted cheese with mushrooms" },
          desc: { es: "Mix de quesos, mozzarella, Oaxaca y fresco. Gratinados con mix de setas (acompañado de 4 tortillas de maíz).", en: "Cheese blend of mozzarella, Oaxaca and fresh cheese, gratinated with mixed mushrooms (served with 4 corn tortillas)." },
          precio: 11.00, alergenos: ["lacteos"], tags: ["vegetariano"] },
        { id: "patata-pastor", foto: "assets/img/patata-pastor.jpg", nombre: { es: "Patata de pastor", en: "Pastor loaded potato" },
          desc: { es: "Patatas al horno de aguja de cerdo adobada en achiote, chiles secos no picantes y piña, queso gratinado, cilantro, cebolla y salsa de queso cheddar.", en: "Baked potatoes with pork marinated in achiote, mild dried chillies and pineapple, melted cheese, cilantro, onion and cheddar sauce." },
          precio: 11.00, alergenos: ["lacteos"] },
        { id: "patata-asada", foto: "assets/img/patata-asada.jpg", nombre: { es: "Patata de asada", en: "Asada loaded potato" },
          desc: { es: "Patatas al horno de aguja de cerdo a la plancha, marinada en soja y queso gratinado, cilantro, cebolla y salsa de queso cheddar.", en: "Baked potatoes with griddled pork marinated in soy, melted cheese, cilantro, onion and cheddar sauce." },
          precio: 11.00, alergenos: ["lacteos", "soja"] },
        { id: "patata-cochinita", foto: "assets/img/patata-cochinita.jpg", nombre: { es: "Patata de cochinita", en: "Cochinita loaded potato" },
          desc: { es: "Patatas al horno de carne de cerdo desmechada, adobada en chiles secos no picantes, achiote, zumo de naranja. Cocida a baja temperatura en hoja de plátano, queso gratinado, cilantro, cebolla y salsa de queso cheddar.", en: "Baked potatoes with shredded pork marinated in mild dried chillies, achiote and orange juice, slow-cooked in banana leaf, melted cheese, cilantro, onion and cheddar sauce." },
          precio: 11.00, alergenos: ["lacteos"] },
        { id: "esquites", nombre: { es: "Esquites", en: "Esquites (Mexican street corn cup)" },
          desc: { es: "Maíz tierno en vaso con mayonesa, queso cotija, chile en polvo y lima.", en: "Corn in a cup with mayo, cotija cheese, chilli powder and lime." },
          precio: 6.50, alergenos: ["lacteos", "huevo"], tags: ["vegetariano"], visible: false, propuesta: true }
      ]}]
    },

    {
      id: "tacos", nombre: { es: "Tacos", en: "Tacos" },
      nota: { es: "La orden puede ser variada.", en: "You can mix your order." },
      columnas: { es: ["Pieza", "Orden de 5"], en: ["Each", "Order of 5"] },
      grupos: [{ items: [
        { id: "taco-pastor", foto: "assets/img/taco-pastor.jpg", nombre: { es: "Tacos al pastor", en: "Tacos al pastor" },
          desc: { es: "Aguja de cerdo adobada en achiote, chiles secos no picantes y piña. (Acompañado con cebolla, cilantro y piña fresca)", en: "Pork marinated in achiote, mild dried chillies and pineapple. (Served with onion, cilantro and fresh pineapple)" },
          precios: [{ etiqueta: "pieza", precio: 2.90 }, { etiqueta: "orden5", precio: 13.00 }],
          popular: true, maridaje: ["herradura-reposado", "alipus"] },
        { id: "taco-asada", foto: "assets/img/taco-asada.jpg", nombre: { es: "Tacos de asada", en: "Tacos de asada" },
          desc: { es: "Aguja de cerdo a la plancha, marinada en soja y queso gratinado. (Acompañado con cebolla y cilantro)", en: "Griddled pork marinated in soy with melted cheese. (Served with onion and cilantro)" },
          precios: [{ etiqueta: "pieza", precio: 2.90 }, { etiqueta: "orden5", precio: 13.00 }],
          alergenos: ["lacteos", "soja"], maridaje: ["1800-blanco", "mitre-origen"] },
        { id: "taco-cochinita", foto: "assets/img/taco-cochinita.jpg", nombre: { es: "Tacos cochinita pibil", en: "Tacos cochinita pibil" },
          desc: { es: "Carne de cerdo desmechada, adobada en chiles secos no picantes, achiote, zumo de naranja. Cocida a baja temperatura en hoja de plátano. (Acompañado con cilantro y encurtido de cebolla morada)", en: "Shredded pork marinated in mild dried chillies, achiote and orange juice, slow-cooked in banana leaf. (Served with cilantro and pickled red onion)" },
          precios: [{ etiqueta: "pieza", precio: 2.90 }, { etiqueta: "orden5", precio: 13.00 }],
          popular: true, maridaje: ["don-julio-blanco", "alipus"] },
        { id: "quesabirria", foto: "assets/img/quesabirria.jpg", nombre: { es: "Quesabirria (3 pz)", en: "Quesabirria (3 pcs)" },
          desc: { es: "Tortilla de maíz media dorada, carne de ternera desmechada adobada en chiles secos no picantes y cocida a fuego lento, acompañada de queso gratinado, cilantro, cebolla y consomé de ternera.", en: "Half-crisped corn tortilla with slow-cooked shredded beef in mild dried chillies, melted cheese, cilantro, onion and beef consommé." },
          precio: 11.70, alergenos: ["lacteos"], maridaje: ["montelobos-espadin", "don-julio-reposado"] },
        { id: "taco-setas", nombre: { es: "Tacos de setas", en: "Mushroom tacos" },
          desc: { es: "Mix de setas salteadas con cebolla y cilantro.", en: "Sautéed mushroom mix with onion and cilantro." },
          precios: [{ etiqueta: "pieza", precio: 2.90 }, { etiqueta: "orden5", precio: 13.00 }],
          tags: ["vegetariano"], visible: false, propuesta: true }
      ]}]
    },

    {
      id: "burritos", nombre: { es: "Burritos", en: "Burritos" },
      grupos: [{ items: [
        { id: "burrito-pastor", foto: "assets/img/burrito-pastor.jpg", nombre: { es: "Burrito pastor", en: "Pastor burrito" },
          desc: { es: "Aguja de cerdo adobada en achiote, chiles secos no picantes y piña con frijoles negros, arroz mexicano, guacamole, pico de gallo, queso gratinado, lechuga y piña, envuelto en tortilla de trigo de 40 cms.", en: "Pork marinated in achiote, mild dried chillies and pineapple with black beans, Mexican rice, guacamole, pico de gallo, melted cheese, lettuce and pineapple, wrapped in a 40 cm wheat tortilla." },
          precios: [{ etiqueta: "solo", precio: 12.90 }, { etiqueta: "gajo", precio: 14.90 }], alergenos: ["lacteos", "gluten"] },
        { id: "burrito-cochinita", foto: "assets/img/burrito-cochinita.jpg", nombre: { es: "Burrito cochinita", en: "Cochinita burrito" },
          desc: { es: "Carne de cerdo desmechada, adobada en chiles secos no picantes, achiote, zumo de naranja. Cocida a baja temperatura en hoja de plátano, con frijoles negros, arroz mexicano, guacamole, pico de gallo, queso gratinado, lechuga, envuelto en tortilla de trigo de 40 cms.", en: "Shredded pork in mild dried chillies, achiote and orange juice, slow-cooked in banana leaf, with black beans, Mexican rice, guacamole, pico de gallo, melted cheese and lettuce, in a 40 cm wheat tortilla." },
          precios: [{ etiqueta: "solo", precio: 12.90 }, { etiqueta: "gajo", precio: 14.90 }], alergenos: ["lacteos", "gluten"] },
        { id: "burrito-asada", foto: "assets/img/burrito-asada.jpg", nombre: { es: "Burrito asada", en: "Asada burrito" },
          desc: { es: "Aguja de cerdo a la plancha, marinada en soja y queso gratinado con frijoles negros, arroz mexicano, guacamole, pico de gallo, queso gratinado, lechuga, envuelto en tortilla de trigo de 40 cms.", en: "Griddled pork marinated in soy with black beans, Mexican rice, guacamole, pico de gallo, melted cheese and lettuce, in a 40 cm wheat tortilla." },
          precios: [{ etiqueta: "solo", precio: 12.90 }, { etiqueta: "gajo", precio: 14.90 }], alergenos: ["lacteos", "gluten", "soja"] }
      ]}],
      columnas: { es: ["Solo", "Con patatas gajo"], en: ["Alone", "With potato wedges"] }
    },

    {
      id: "burgers", nombre: { es: "Burgers", en: "Burgers" },
      columnas: { es: ["Pieza", "Con patatas gajo"], en: ["Burger", "With potato wedges"] },
      grupos: [{ items: [
        { id: "burger-clasica", nombre: { es: "La Clásica", en: "La Clásica" },
          desc: { es: "140 gramos de carne de ternera preparada en casa, acompañada de queso cheddar, bacon, lechuga, tomate, cebolla y salsa especial de la casa.", en: "140 g house-made beef patty with cheddar, bacon, lettuce, tomato, onion and our special house sauce." },
          precios: [{ etiqueta: "solo", precio: 11.90 }, { etiqueta: "gajo", precio: 13.90 }], alergenos: ["lacteos", "gluten"], foto: "assets/img/burger-clasica.jpg" },
        { id: "burger-mexican", nombre: { es: "La Mexican", en: "La Mexican" },
          desc: { es: "140 gramos de carne de ternera preparada en casa, piña asada, carne al pastor, salsa de queso cheddar, bacon, cilantro y cebolla.", en: "140 g house-made beef patty with grilled pineapple, al pastor pork, cheddar sauce, bacon, cilantro and onion." },
          precios: [{ etiqueta: "solo", precio: 12.90 }, { etiqueta: "gajo", precio: 14.90 }], alergenos: ["lacteos", "gluten"], foto: "assets/img/burger-mexican.jpg", popular: true },
        { id: "burger-yucateca", foto: "assets/img/burger-yucateca-patatas.jpg", nombre: { es: "La Yucateca", en: "La Yucateca" },
          desc: { es: "140 gramos de carne de ternera preparada en casa, cochinita pibil, encurtido de cebolla morada, bacon, salsa de queso cheddar y cilantro.", en: "140 g house-made beef patty with cochinita pibil, pickled red onion, bacon, cheddar sauce and cilantro." },
          precios: [{ etiqueta: "solo", precio: 12.90 }, { etiqueta: "gajo", precio: 14.90 }], alergenos: ["lacteos", "gluten"], }
      ]}]
    },

    {
      id: "postres", nombre: { es: "Postres", en: "Desserts" },
      grupos: [{ items: [
        { id: "pan-elote", foto: "assets/img/pan-de-elote.jpg", nombre: { es: "Pan de elote", en: "Pan de elote" },
          desc: { es: "Nuestra ya famosa cremosa tarta de maíz.", en: "Our famous creamy corn cake." },
          precio: 5.90, alergenos: ["lacteos", "huevo"], popular: true },
        { id: "tarta-queso", foto: "assets/img/tarta-queso.jpg", nombre: { es: "Tarta de queso clásica", en: "Classic cheesecake" },
          desc: { es: "Suave y cremosa tarta de queso con delicada base crujiente.", en: "Soft, creamy cheesecake on a delicate crunchy base." },
          precio: 5.90, alergenos: ["lacteos"] },
        { id: "tarta-nutella", foto: "assets/img/tarta-nutella.jpg", nombre: { es: "Tarta de queso y Nutella", en: "Cheesecake with Nutella" },
          desc: { es: "Suave y cremosa tarta de queso y Nutella con delicada base crujiente.", en: "Soft, creamy cheesecake with Nutella on a delicate crunchy base." },
          precio: 6.40, alergenos: ["lacteos"] }
      ]}]
    },

    {
      id: "bebidas", nombre: { es: "Bebidas", en: "Drinks" },
      grupos: [
        { nombre: { es: "Coctelería", en: "Cocktails" }, items: [
          { id: "chelada", foto: "assets/img/chelada.jpg", nombre: { es: "Chelada", en: "Chelada" }, precio: 3.90 },
          { id: "michelada", foto: "assets/img/michelada.jpg", nombre: { es: "Michelada", en: "Michelada" }, precio: 4.50 },
          { id: "margarita-clasica", foto: "assets/img/margarita-clasica.jpg", nombre: { es: "Margarita clásica", en: "Classic margarita" }, precio: 6.00, popular: true },
          { id: "margarita-tamarindo", foto: "assets/img/margarita-tamarindo.jpg", nombre: { es: "Margarita de tamarindo", en: "Tamarind margarita" }, precio: 6.00 },
          { id: "paloma", nombre: { es: "Paloma", en: "Paloma" }, desc: { es: "Tequila, pomelo, lima y soda.", en: "Tequila, grapefruit, lime and soda." }, precio: 6.50, visible: false, propuesta: true },
          { id: "mezcalita", nombre: { es: "Mezcalita", en: "Mezcalita" }, desc: { es: "Mezcal, lima, naranja y sal de gusano.", en: "Mezcal, lime, orange and worm salt." }, precio: 6.90, visible: false, propuesta: true }
        ]},
        { nombre: { es: "Cubatas", en: "Mixed drinks" }, items: [
          { id: "cubata-ron", nombre: { es: "Ron", en: "Rum" }, precio: 7.20 },
          { id: "cubata-ginebra", nombre: { es: "Ginebra", en: "Gin" }, precio: 7.20 },
          { id: "cubata-vodka", nombre: { es: "Vodka", en: "Vodka" }, precio: 7.20 }
        ]},
        { nombre: { es: "Vino", en: "Wine" }, items: [
          { id: "vino-tinto", foto: "assets/img/vino-tinto.jpg", nombre: { es: "Copa de vino tinto", en: "Glass of red wine" }, precio: 2.80 },
          { id: "vino-blanco", nombre: { es: "Copa de vino blanco", en: "Glass of white wine" }, precio: 2.80 }
        ]},
        { nombre: { es: "Cervezas Alhambra", en: "Alhambra beers" }, items: [
          { id: "alh-especial", nombre: { es: "Alhambra Especial", en: "Alhambra Especial" }, precios: [{ etiqueta: "cana", precio: 1.90 }, { etiqueta: "doble", precio: 2.50 }, { etiqueta: "tanque", precio: 4.20 }] },
          { id: "alh-roja", nombre: { es: "Alhambra Roja", en: "Alhambra Roja" }, precios: [{ etiqueta: "cana", precio: 2.10 }, { etiqueta: "doble", precio: 2.70 }, { etiqueta: "tanque", precio: 4.40 }] },
          { id: "tercio-especial", nombre: { es: "Tercio Alhambra Especial", en: "Alhambra Especial bottle" }, precio: 2.00 },
          { id: "alh-sin", nombre: { es: "Alhambra sin alcohol", en: "Alhambra alcohol-free" }, precio: 2.00 },
          { id: "alh-radler", nombre: { es: "Alhambra Radler", en: "Alhambra Radler" }, precio: 2.00 },
          { id: "alh-1925", nombre: { es: "Alhambra 1925", en: "Alhambra 1925" }, precio: 3.20 }
        ], columnas: { es: ["Caña", "Doble", "Tanque"], en: ["Small", "Double", "Tank"] } },
        { nombre: { es: "Cervezas importadas", en: "Imported beers" }, items: [
          { id: "corona", nombre: { es: "Corona", en: "Corona" }, precio: 3.20 },
          { id: "pacifico", nombre: { es: "Pacífico", en: "Pacífico" }, precio: 3.20 },
          { id: "modelo-especial", nombre: { es: "Modelo Especial", en: "Modelo Especial" }, precio: 3.20 },
          { id: "negra-modelo", nombre: { es: "Negra Modelo", en: "Negra Modelo" }, precio: 3.20 },
          { id: "leffe-triple", nombre: { es: "Leffe Triple", en: "Leffe Triple" }, precio: 3.20 }
        ]},
        { nombre: { es: "Refrescos y agua", en: "Soft drinks & water" }, items: [
          { id: "coca-cola", nombre: { es: "Coca-Cola", en: "Coca-Cola" }, precio: 2.50 },
          { id: "coca-cola-zero", nombre: { es: "Coca-Cola Zero", en: "Coca-Cola Zero" }, precio: 2.50 },
          { id: "fanta-naranja", nombre: { es: "Fanta naranja", en: "Fanta orange" }, precio: 2.50 },
          { id: "fanta-limon", nombre: { es: "Fanta limón", en: "Fanta lemon" }, precio: 2.50 },
          { id: "aquarius-naranja", nombre: { es: "Aquarius naranja", en: "Aquarius orange" }, precio: 2.50 },
          { id: "aquarius-limon", nombre: { es: "Aquarius limón", en: "Aquarius lemon" }, precio: 2.50 },
          { id: "aquarius-melocoton", nombre: { es: "Aquarius melocotón", en: "Aquarius peach" }, precio: 2.50 },
          { id: "fuze-limo", nombre: { es: "Fuze Tea limón", en: "Fuze Tea lemon" }, precio: 2.50 },
          { id: "fuze-maracuya", nombre: { es: "Fuze Tea maracuyá", en: "Fuze Tea passion fruit" }, precio: 2.50 },
          { id: "monster-original", nombre: { es: "Monster original", en: "Monster original" }, precio: 2.50 },
          { id: "monster-mango", nombre: { es: "Monster Mango Loco", en: "Monster Mango Loco" }, precio: 2.50 },
          { id: "agua", nombre: { es: "Agua Aquabona 500 ml (vidrio)", en: "Aquabona water 500 ml (glass)" }, precio: 1.50 },
          { id: "agua-jamaica", nombre: { es: "Agua fresca de jamaica", en: "Hibiscus agua fresca" }, precio: 2.80, visible: false, propuesta: true },
          { id: "horchata", nombre: { es: "Horchata", en: "Horchata" }, precio: 2.80, alergenos: ["lacteos"], visible: false, propuesta: true }
        ]},
        { nombre: { es: "Cafetería", en: "Coffee" }, items: [
          { id: "cafe-solo", nombre: { es: "Café solo", en: "Espresso" }, precio: 1.20 },
          { id: "cafe-cortado", nombre: { es: "Café cortado", en: "Cortado" }, precio: 1.40 },
          { id: "cafe-leche", nombre: { es: "Café con leche", en: "Café con leche" }, precio: 1.80 },
          { id: "cafe-bombon", nombre: { es: "Café bombón", en: "Café bombón" }, precio: 2.00 },
          { id: "cafe-americano", nombre: { es: "Café americano", en: "Americano" }, precio: 1.50 },
          { id: "carajillo", nombre: { es: "Carajillo", en: "Carajillo" }, precio: 2.50 },
          { id: "te", nombre: { es: "Té e infusión", en: "Tea & infusion" }, precio: 1.50 },
          { id: "tocado", nombre: { es: "Suplemento: tocado de cualquier licor", en: "Add a splash of any liqueur" }, precio: 0.20 }
        ]}
      ]
    }
  ],

  /* ---------- GUISOS PARA LLEVAR (se editan igual que la carta, pestaña "Guisos" en admin.html) ----------
     Paquetes de 500 gr al vacío · rinden aprox. 20-25 tacos */
  guisos: {
    id: "guisos", nombre: { es: "Guisos artesanales", en: "Artisan stews" },
    nota: { es: "Presentación de 500 gr · rendimiento aproximado de 20-25 tacos.", en: "500 gr pack · yields approx. 20-25 tacos." },
    grupos: [
      { nombre: { es: "Guisos artesanales (500 gr)", en: "Artisan stews (500 gr)" }, items: [
        { id: "g-carnitas", foto: "assets/img/guiso-carnitas-textura.jpg", fotos: ["assets/img/guiso-carnitas-textura.jpg", "assets/img/guiso-carnitas.jpg", "assets/img/guiso-carnitas-2.jpg", "assets/img/guiso-carnitas-pack.jpg"], desc: { es: "Cerdo cocinado lentamente hasta quedar tierno y jugoso. Listo para calentar y servir en tortilla.", en: "Pork slow-cooked until tender and juicy. Ready to heat and serve in a tortilla." }, nombre: { es: "Carnitas", en: "Carnitas" }, precio: 16.50 },
        { id: "g-cochinita", foto: "assets/img/guiso-cochinita-textura.jpg", fotos: ["assets/img/guiso-cochinita-textura.jpg", "assets/img/guiso-cochinita.jpg", "assets/img/guiso-cochinita-2.jpg", "assets/img/guiso-cochinita-pack.jpg"], desc: { es: "Carne de cerdo desmechada, adobada en chiles secos no picantes, achiote y zumo de naranja. Cocida a baja temperatura en hoja de plátano.", en: "Shredded pork marinated in mild dried chillies, achiote and orange juice, slow-cooked in banana leaf." }, nombre: { es: "Cochinita pibil", en: "Cochinita pibil" }, precio: 16.50 },
        { id: "g-suadero", foto: "assets/img/guiso-suadero-textura.jpg", fotos: ["assets/img/guiso-suadero-textura.jpg", "assets/img/guiso-suadero.jpg", "assets/img/guiso-suadero-2.jpg", "assets/img/guiso-suadero-pack.jpg"], desc: { es: "Res tierna y jugosa, un clásico de los tacos de la Ciudad de México.", en: "Tender, juicy beef, a classic of Mexico City tacos." }, nombre: { es: "Suadero", en: "Suadero" }, precio: 16.50 }
      ]},
      { nombre: { es: "Guisos artesanales premium (500 gr)", en: "Premium artisan stews (500 gr)" }, items: [
        { id: "g-birria", foto: "assets/img/guiso-birria-textura.jpg", fotos: ["assets/img/guiso-birria-textura.jpg", "assets/img/guiso-birria.jpg", "assets/img/guiso-birria-2.jpg", "assets/img/guiso-birria-pack.jpg"], desc: { es: "Ternera desmechada, adobada en chiles secos no picantes y cocida a fuego lento. Perfecta para tacos y quesabirria.", en: "Shredded beef marinated in mild dried chillies and slow-cooked. Perfect for tacos and quesabirria." }, nombre: { es: "Birria (ternera)", en: "Birria (beef)" }, precio: 23.50 },
        { id: "g-barbacoa", foto: "assets/img/guiso-barbacoa-textura.jpg", fotos: ["assets/img/guiso-barbacoa-textura.jpg", "assets/img/guiso-barbacoa.jpg", "assets/img/guiso-barbacoa-2.jpg", "assets/img/guiso-barbacoa-pack.jpg"], desc: { es: "Ternera cocida lentamente hasta quedar suave y melosa, un clásico de la cocina mexicana.", en: "Beef cooked slowly until soft and melting, a classic of Mexican cooking." }, nombre: { es: "Barbacoa (ternera)", en: "Barbacoa (beef)" }, precio: 23.50 },
        { id: "g-pastor", foto: "assets/img/guiso-pastor-textura.jpg", fotos: ["assets/img/guiso-pastor-textura.jpg", "assets/img/guiso-pastor.jpg", "assets/img/guiso-pastor-2.jpg", "assets/img/guiso-pastor-pack.jpg"], desc: { es: "Aguja de cerdo adobada en achiote, chiles secos no picantes y piña.", en: "Pork shoulder marinated in achiote, mild dried chillies and pineapple." }, nombre: { es: "Pastor", en: "Al pastor" }, precio: 23.50 },
        { id: "g-mole", foto: "assets/img/guiso-pollomole-textura.jpg", fotos: ["assets/img/guiso-pollomole-textura.jpg", "assets/img/guiso-pollomole.jpg", "assets/img/guiso-pollomole-2.jpg", "assets/img/guiso-pollomole-pack.jpg"], desc: { es: "Pollo en salsa de mole, de sabor profundo e intenso.", en: "Chicken in mole sauce, deep and intense in flavour." }, nombre: { es: "Pollo con mole", en: "Chicken with mole" }, precio: 23.50 }
      ]},
      { nombre: { es: "Complementos", en: "Extras" }, galeria: ["assets/img/guisos-caja.jpg", "assets/img/comp-tortillas.jpg", "assets/img/comp-salsas.jpg", "assets/img/guisos-1.jpg"], items: [
        { id: "g-tortillas", nombre: { es: "Tortillas taqueras (25 unidades)", en: "Taco tortillas (25 pieces)" }, precio: 6.50 },
        { id: "g-salsa-tomatillo", nombre: { es: "Salsa tomatillo verde 100 ml", en: "Green tomatillo salsa 100 ml" }, precio: 2.00, picor: 1 },
        { id: "g-salsa-aguacate", nombre: { es: "Salsa de aguacate y chile verde 100 ml", en: "Avocado & green chilli salsa 100 ml" }, precio: 2.00, picor: 2 },
        { id: "g-salsa-arbol", nombre: { es: "Salsa chile de árbol 100 ml", en: "Chile de árbol salsa 100 ml" }, precio: 2.00, picor: 3 },
        { id: "g-salsa-macha", nombre: { es: "Salsa macha de chiles secos 100 ml", en: "Dried-chilli macha salsa 100 ml" }, precio: 2.00, picor: 4 },
        { id: "g-salsa-habanero", nombre: { es: "Salsa de chile habanero 100 ml", en: "Habanero salsa 100 ml" }, precio: 2.00, picor: 5 }
      ]}
    ]
  },

  /* ---------- TEQUILA Y MEZCAL ----------
     precio = chupito de 2 oz (≈59 ml). El rango (económico/top/premium)
     se calcula solo a partir del precio, ver meta.tiers.
     tipo: tequila | mezcal      estilo: blanco | reposado | cristalino | joven */
  agave: {
    unidad: { es: "Chupito de 2 oz (≈ 59 ml)", en: "2 oz shot (≈ 59 ml)" },
    items: [
      { id: "cuervo-especial", marca: "José Cuervo", nombre: "Especial Silver",        tipo: "tequila", estilo: "blanco",     precio: 4.90 },
      { id: "cuervo-tradicional-blanco",    marca: "José Cuervo", nombre: "Tradicional Blanco",    tipo: "tequila", estilo: "blanco",     precio: 5.90 },
      { id: "cuervo-tradicional-reposado",  marca: "José Cuervo", nombre: "Tradicional Reposado",  tipo: "tequila", estilo: "reposado",   precio: 5.90 },
      { id: "1800-blanco",       marca: "1800",      nombre: "Blanco",    tipo: "tequila", estilo: "blanco",     precio: 7.90 },
      { id: "herradura-blanco",  marca: "Herradura", nombre: "Blanco",    tipo: "tequila", estilo: "blanco",     precio: 7.90 },
      { id: "don-julio-blanco",  marca: "Don Julio", nombre: "Blanco",    tipo: "tequila", estilo: "blanco",     precio: 7.90 },
      { id: "1800-reposado",     marca: "1800",      nombre: "Reposado",  tipo: "tequila", estilo: "reposado",   precio: 8.50 },
      { id: "herradura-reposado",marca: "Herradura", nombre: "Reposado",  tipo: "tequila", estilo: "reposado",   precio: 8.50 },
      { id: "don-julio-reposado",marca: "Don Julio", nombre: "Reposado",  tipo: "tequila", estilo: "reposado",   precio: 9.50 },
      { id: "casamigos-blanco",  marca: "Casamigos", nombre: "Blanco",    tipo: "tequila", estilo: "blanco",     precio: 9.50 },
      { id: "patron-silver",     marca: "Patrón",    nombre: "Silver",    tipo: "tequila", estilo: "blanco",     precio: 9.50 },
      { id: "dobel-diamante",    marca: "Maestro Dobel", nombre: "Diamante", tipo: "tequila", estilo: "cristalino", precio: 10.00 },
      { id: "patron-reposado",   marca: "Patrón",    nombre: "Reposado",  tipo: "tequila", estilo: "reposado",   precio: 10.50 },
      { id: "don-julio-70",      marca: "Don Julio", nombre: "70",        tipo: "tequila", estilo: "cristalino", precio: 11.50, nota: { es: "Añejo cristalino", en: "Clear aged (añejo cristalino)" } },

      { id: "gusano-rojo",       marca: "Gusano Rojo", nombre: "",          tipo: "mezcal", estilo: "joven", precio: 4.90 },
      { id: "mitre-origen",      marca: "Mitre",       nombre: "Origen",    tipo: "mezcal", estilo: "joven", precio: 5.90 },
      { id: "alipus",            marca: "Alipús",      nombre: "",          tipo: "mezcal", estilo: "joven", precio: 7.90, nota: { es: "Mezcal artesanal de agave espadín", en: "Artisanal espadín agave mezcal" } },
      { id: "montelobos-espadin",marca: "Montelobos",  nombre: "Espadín",   tipo: "mezcal", estilo: "joven", precio: 9.50, nota: { es: "Mezcal de agave espadín", en: "Espadín agave mezcal" } }
    ],
    extras: [
      { id: "shot-banderita", nombre: { es: "Shot Banderita", en: "Shot Banderita" },
        desc: { es: "Tequila, sangrita y lima (2 oz). Así se toma de verdad en México.", en: "Tequila, sangrita and lime (2 oz). The way it's really drunk in Mexico." }, precio: null, nota: { es: "Se sirve con el tequila que elijas", en: "Served with the tequila of your choice" } },
      { id: "crema-chupito", sabores: [{ es: "Fresa", en: "Strawberry" }, { es: "Durazno", en: "Peach" }, { es: "Maracuyá", en: "Passion fruit" }], nombre: { es: "Crema de tequila · chupito", en: "Tequila cream · shot" }, precio: 3.00 },
      { id: "crema-vaso", sabores: [{ es: "Fresa", en: "Strawberry" }, { es: "Durazno", en: "Peach" }, { es: "Maracuyá", en: "Passion fruit" }], nombre: { es: "Crema de tequila · vaso", en: "Tequila cream · glass" }, precio: 4.50 },
      { id: "vuelo", nombre: { es: "Vuelo de agave", en: "Agave flight" },
        desc: { es: "Tres chupitos de 1 oz para comparar: un blanco, un reposado y un cristalino. Ideal para descubrir tu estilo.", en: "Three 1 oz tastings to compare: a blanco, a reposado and a cristalino. The best way to find your style." },
        precio: 16.90, visible: false, propuesta: true }
    ],
    mezcalNota: { es: "Se sirve con sal de naranja y gusano.", en: "Served with orange salt and worm salt." }
  },

  etiquetasPrecio: {
    pieza:   { es: "pieza", en: "each" },
    orden5:  { es: "orden de 5", en: "order of 5" },
    solo:    { es: "solo", en: "alone" },
    gajo:    { es: "con patatas gajo", en: "with wedges" },
    cana:    { es: "caña", en: "small" },
    doble:   { es: "doble", en: "double" },
    tanque:  { es: "tanque", en: "tank" }
  }
};
