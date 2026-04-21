export type Vehicle = {
  id: string;
  name: string;
  price: string;
  badge?: { text: string; variant: "primary" | "dark" };
  year: string;
  km: string;
  tag3: string;
  engineShort: string;
  fuel: string;
  image: string;
  imageAlt: string;
  detail: {
    heroBadge: string;
    heroSubtitle: string;
    priceLine: string;
    mainImage: string;
    thumb1: string;
    thumb2: string;
    thumb1Alt: string;
    thumb2Alt: string;
    story: [string, string];
    amenities: string[];
    specs: {
      motor: string;
      motorDesc: string;
      power: string;
      powerDesc: string;
      accel: string;
      accelDesc: string;
      trans: string;
      transDesc: string;
    };
    narrativeImage: string;
    narrativeImageAlt: string;
  };
};

export const vehicles: Vehicle[] = [
  {
    id: "alfa-romeo-stelvio-azul",
    name: "Alfa Romeo Stelvio Q4",
    price: "Consultar",
    badge: { text: "Nuevo Ingreso", variant: "primary" },
    year: "2019",
    km: "122.000 KM",
    tag3: "Automático",
    engineShort: "2.2 Diésel",
    fuel: "Diésel",
    image: "/cars/ALFA%20ROMEO%20STELVIO%20azul/car_front_left.jpeg",
    imageAlt: "Alfa Romeo Stelvio Q4 azul, vista frontal en showroom OtoMotor",
    detail: {
      heroBadge: "Q4 AWD",
      heroSubtitle: "AÑO 2019 • 122.000 KM • SUV PREMIUM",
      priceLine: "Consultar precio",
      mainImage: "/cars/ALFA%20ROMEO%20STELVIO%20azul/car_front.jpeg",
      thumb1: "/cars/ALFA%20ROMEO%20STELVIO%20azul/car_rear.jpeg",
      thumb2: "/cars/ALFA%20ROMEO%20STELVIO%20azul/car_interior_dashboard.jpeg",
      thumb1Alt: "Alfa Romeo Stelvio azul, vista trasera",
      thumb2Alt: "Interior del Alfa Romeo Stelvio azul, salpicadero",
      story: [
        "El Alfa Romeo Stelvio Q4 combina el diseño italiano más puro con un carácter deportivo que pocos SUV pueden igualar. Su motor 2.2 diésel ofrece eficiencia sin renunciar a la potencia.",
        "Equipado con sistemas de seguridad avanzados, frenado automático, control de cambio de carril y apertura eléctrica del portón, es un vehículo completo para el uso diario más exigente.",
      ],
      amenities: [
        "Cámara trasera",
        "Sensores de parking",
        "Control crucero",
        "Apertura eléctrica portón",
        "Luces xenon",
        "Frenado automático",
        "Control cambio de carril",
        "Sistemas de seguridad ADA",
      ],
      specs: {
        motor: "2.2 Diésel",
        motorDesc: "Motor diésel de 4 cilindros con turbo de respuesta eficiente",
        power: "190 CV / 140 kW",
        powerDesc: "Potencia equilibrada para un SUV ágil y económico",
        accel: "Tracción Q4",
        accelDesc: "Tracción a las 4 ruedas para toda condición",
        trans: "Automática",
        transDesc: "Caja automática con modos de conducción",
      },
      narrativeImage: "/cars/ALFA%20ROMEO%20STELVIO%20azul/car_rear_left.jpeg",
      narrativeImageAlt: "Alfa Romeo Stelvio azul, vista trasera izquierda",
    },
  },
  {
    id: "alfa-romeo-stelvio-blanco",
    name: "Alfa Romeo Stelvio Q4",
    price: "Consultar",
    year: "2020",
    km: "80.446 KM",
    tag3: "Automático 8v",
    engineShort: "2.0 Gasolina",
    fuel: "Gasolina",
    image: "/cars/ALFA%20ROMEO%20STELVIO%20BLANCO/car_front_left.jpg",
    imageAlt: "Alfa Romeo Stelvio Q4 blanco con interior rojo, en showroom OtoMotor",
    detail: {
      heroBadge: "Q4 AWD",
      heroSubtitle: "AÑO 2020 • 80.446 KM • SUV PREMIUM",
      priceLine: "Consultar precio",
      mainImage: "/cars/ALFA%20ROMEO%20STELVIO%20BLANCO/car_front.jpg",
      thumb1: "/cars/ALFA%20ROMEO%20STELVIO%20BLANCO/car_rear.jpg",
      thumb2: "/cars/ALFA%20ROMEO%20STELVIO%20BLANCO/car_interior_dashboard.jpg",
      thumb1Alt: "Alfa Romeo Stelvio blanco, vista trasera",
      thumb2Alt: "Interior del Alfa Romeo Stelvio blanco con tapicería roja y GPS",
      story: [
        "El Alfa Romeo Stelvio en blanco con interior rojo es una combinación que detiene miradas. Motor gasolina 2.0 de 200 CV con tracción Q4 para una conducción deportiva en cualquier situación.",
        "Tapicería de cuero, climatizador bizona, GPS integrado y retrovisores calefactados hacen de este Stelvio un SUV completo y sofisticado para el día a día.",
      ],
      amenities: [
        "Tapicería de cuero",
        "Cámara trasera",
        "GPS integrado",
        "Climatizador bizona",
        "Retrovisores calefactados",
        "6 airbags",
        "ABS / ESP",
        "Llantas de aleación",
      ],
      specs: {
        motor: "2.0 TFSI",
        motorDesc: "Motor gasolina de 4 cilindros turbo de alta eficiencia",
        power: "200 CV / 148 kW",
        powerDesc: "Potencia deportiva con tracción integral Q4",
        accel: "Tracción Q4",
        accelDesc: "Tracción total para uso en cualquier condición",
        trans: "Automática 8v",
        transDesc: "Caja automática de 8 velocidades",
      },
      narrativeImage: "/cars/ALFA%20ROMEO%20STELVIO%20BLANCO/car_rear_right.jpg",
      narrativeImageAlt: "Alfa Romeo Stelvio blanco, vista trasera derecha",
    },
  },
  {
    id: "audi-q2-negro",
    name: "Audi Q2 30 TFSI",
    price: "Consultar",
    badge: { text: "Casi Nuevo", variant: "primary" },
    year: "2025",
    km: "3.000 KM",
    tag3: "Manual",
    engineShort: "1.0 TFSI",
    fuel: "Gasolina",
    image: "/cars/AUDI%20Q2%20NEGRO/car_front_left.jpg",
    imageAlt: "Audi Q2 negro, vista frontal en showroom OtoMotor",
    detail: {
      heroBadge: "Casi Nuevo",
      heroSubtitle: "AÑO 2025 • 3.000 KM • SUV COMPACTO",
      priceLine: "Consultar precio",
      mainImage: "/cars/AUDI%20Q2%20NEGRO/car_front.jpg",
      thumb1: "/cars/AUDI%20Q2%20NEGRO/car_rear.jpg",
      thumb2: "/cars/AUDI%20Q2%20NEGRO/car_interior_driver.jpg",
      thumb1Alt: "Audi Q2 negro, vista trasera",
      thumb2Alt: "Interior del Audi Q2 con cuadro digital y pantalla MMI",
      story: [
        "El Audi Q2 2025 es prácticamente nuevo, con apenas 3.000 km. Diseño compacto y dinámico con toda la tecnología Audi de última generación.",
        "Faros LED, Climatronic, cámara trasera y aviso de salida de carril hacen de este Q2 el SUV urbano perfecto para quien exige lo mejor sin compromisos.",
      ],
      amenities: [
        "Faros principales LED",
        "Climatronic bizona",
        "Cámara trasera",
        "Ayuda de aparcamiento",
        "Aviso salida de carril",
        "ISOFIX",
        "Portón eléctrico",
        "Volante deportivo cuero",
      ],
      specs: {
        motor: "1.0 TFSI",
        motorDesc: "Motor gasolina de 3 cilindros turbo eficiente",
        power: "116 CV / 85 kW",
        powerDesc: "Potencia ágil ideal para uso urbano con bajo consumo",
        accel: "Manual 6v",
        accelDesc: "Caja manual de 6 velocidades de respuesta precisa",
        trans: "Manual",
        transDesc: "Transmisión manual de 6 velocidades",
      },
      narrativeImage: "/cars/AUDI%20Q2%20NEGRO/car_rear_right.jpg",
      narrativeImageAlt: "Audi Q2 negro, vista trasera derecha",
    },
  },
  {
    id: "audi-q3-s-line",
    name: "Audi Q3 S line",
    price: "Consultar",
    year: "2020",
    km: "99.444 KM",
    tag3: "Automático",
    engineShort: "2.0 TFSI",
    fuel: "Gasolina",
    image: "/cars/Audi%20Q3%20S%20line/car_front_left.jpg",
    imageAlt: "Audi Q3 S line negro, vista frontal en showroom OtoMotor",
    detail: {
      heroBadge: "S line",
      heroSubtitle: "AÑO 2020 • 99.444 KM • SUV SPORT",
      priceLine: "Consultar precio",
      mainImage: "/cars/Audi%20Q3%20S%20line/car_front.jpg",
      thumb1: "/cars/Audi%20Q3%20S%20line/car_rear.jpg",
      thumb2: "/cars/Audi%20Q3%20S%20line/car_interior_dashboard.jpg",
      thumb1Alt: "Audi Q3 S line negro, vista trasera",
      thumb2Alt: "Interior del Audi Q3 S line con cuadro digital y navegación",
      story: [
        "El Audi Q3 S line combina estética deportiva y equipamiento premium. Su motor 2.0 TFSI de 230 CV y caja automática ofrecen una conducción fluida y enérgica en cualquier vía.",
        "Cuadro digital, climatizador de 2 zonas, sistema de navegación y sensores delanteros y traseros hacen de este Q3 un SUV completo para cualquier necesidad.",
      ],
      amenities: [
        "Cuadro digital virtual",
        "Sistema de navegación",
        "Climatizador 2 zonas",
        "Sensores delanteros y traseros",
        "Cámara trasera",
        "Luces LED",
        "Control crucero",
        "Bluetooth",
      ],
      specs: {
        motor: "2.0 TFSI",
        motorDesc: "Motor gasolina de 4 cilindros turbo de alto rendimiento",
        power: "230 CV / 169 kW",
        powerDesc: "Potencia deportiva propia de la línea S",
        accel: "S tronic automático",
        accelDesc: "Caja automática de doble embrague S tronic",
        trans: "Automática S tronic",
        transDesc: "Transmisión automática con modo sport",
      },
      narrativeImage: "/cars/Audi%20Q3%20S%20line/car_rear_right.jpg",
      narrativeImageAlt: "Audi Q3 S line negro, vista trasera derecha",
    },
  },
  {
    id: "audi-q7-55-tfsie",
    name: "Audi Q7 55 TFSIe quattro",
    price: "Consultar",
    badge: { text: "Híbrido enchufable", variant: "dark" },
    year: "2021",
    km: "82.304 KM",
    tag3: "Quattro",
    engineShort: "3.0 TFSI PHEV",
    fuel: "Híbrido",
    image: "/cars/Audi%20Q7/car_front_right.jpg",
    imageAlt: "Audi Q7 55 TFSIe gris metalizado, vista frontal en showroom OtoMotor",
    detail: {
      heroBadge: "Híbrido Enchufable",
      heroSubtitle: "AÑO 2021 • 82.304 KM • SUV 7 PLAZAS",
      priceLine: "Consultar precio",
      mainImage: "/cars/Audi%20Q7/car_front_left.jpg",
      thumb1: "/cars/Audi%20Q7/car_rear.jpg",
      thumb2: "/cars/Audi%20Q7/car_interior_driver.jpg",
      thumb1Alt: "Audi Q7 55 TFSIe gris, vista trasera",
      thumb2Alt: "Interior del Audi Q7 con virtual cockpit y doble pantalla MMI",
      story: [
        "El Audi Q7 55 TFSIe es un SUV de 7 plazas que combina un V6 gasolina de 381 CV con un motor eléctrico, obteniendo etiqueta 0 y prestaciones de alto nivel.",
        "Virtual cockpit, Apple CarPlay, Android Auto, asientos de cuero eléctricos, keyless entry y start, faros LED y sistema de navegación lo convierten en el SUV familiar definitivo.",
      ],
      amenities: [
        "Virtual cockpit",
        "Apple CarPlay / Android Auto",
        "Asientos de cuero eléctricos",
        "Keyless entry y start",
        "Faros LED",
        "Cámara trasera",
        "Parktronic delantero y trasero",
        "Etiqueta 0 emisiones",
      ],
      specs: {
        motor: "3.0 TFSI + eléctrico",
        motorDesc: "Motor híbrido enchufable V6 gasolina con módulo eléctrico",
        power: "381 CV / 280 kW",
        powerDesc: "Potencia combinada con modo eléctrico en ciudad",
        accel: "Quattro AWD",
        accelDesc: "Tracción a las 4 ruedas con distribución inteligente",
        trans: "Automática tiptronic",
        transDesc: "Transmisión automática de 8 velocidades",
      },
      narrativeImage: "/cars/Audi%20Q7/car_rear_left.jpg",
      narrativeImageAlt: "Audi Q7 55 TFSIe gris, vista trasera izquierda",
    },
  },
];

export function getVehicle(id: string) {
  return vehicles.find((v) => v.id === id);
}
