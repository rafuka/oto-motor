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

/** Content aligned with Stitch “Inventario / Detalles del Vehículo - Oto Motor” + Vanguard Automotive tokens */
export const vehicles: Vehicle[] = [
  {
    id: "bmw-m4-competition",
    name: "BMW M4 Competition",
    price: "€84,500",
    badge: { text: "Nuevo Ingreso", variant: "primary" },
    year: "2023",
    km: "12,400 KM",
    tag3: "Automático",
    engineShort: "3.0L Bi-Turbo",
    fuel: "Gasolina",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTUxiqJf9HLVym7KD6Rv7nB5rg5mzOXPGYB-ewZT9eJryDq2HVNcoHPvZfO3X0yS-IG0YVU12NdUnrHBgzaJfzEZ28fYVy57QG9Uu39qZUlBilLlBeaoyvRRnnJjL1E8uyfGQePo627krZ1EI5dIB7SF_ZVM9LNXs6aIm8zbbTPjfm64KdvvIyuZCqjyZuvqmyLDbDypMlxvGmH1swGnioToYl74IRwkIvzABrCxhlpN_6LQ3jY8KHw-bsobUOj138sSzrFB_lCvU",
    imageAlt:
      "Deep black BMW M4 Competition parked in an urban street at dusk with glowing tail lights",
    detail: {
      heroBadge: "Edición Limitada",
      heroSubtitle: "MODELO 2024 • 0 KM • SEDÁN DE LUJO",
      priceLine: "$1,850,000 MXN",
      mainImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBQN_bw-sG6SWko7MnbMnpDVwpFKEJ74YJ_sIm8uAjn_V2fj_xL_quxWLYQi46XI71HvVHAolAakW3OjzGCgqIOMFNddEhhUd1MvPVdv8bD1Qpb2RVE2wEH_cUDyoq7rO1BkljANUaVoPJbGsGBNfqpAgLHG24QKXqu_NxDsKenKRt92PUrdoh-q2dZ1O8RFROufsQEK2RsVpCcKM9toclx_FRzk_mMrcUQeQevHSLP5P0mAdwDDsvw57-zEhwKfq3OFkjGoc5bbBM",
      thumb1:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBnBR7Qn5hmJIR-P1VG8QX_tEmXFnSVGdMKFCZMI-bwhpGRoNl3q3bFMoFRtGHXLNk3xkXahPy4e5-OsYOZwYMthlc7vHzsfLtju8mzq1GJ8fy9YHsKwG_Ru8ceR8L15sN8d1_vB9LZcYK6gT0hD6Ugp3rEu_DbZtlWREMphI0sByvF3SYWku6_50PqXLyCIHOQxwYZqw8-2rzw9dCswL7WAB0e1TrBovEwg79ODSTC36r9j1bSy9NyXwF11sWhIpUEAE_6YL5f8r0",
      thumb2:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCI8soF09qTOGBeQQfFMGvU04mIgoXii7Eq288moDm-A-CViz446N_CCdMvDlLJCrwNeANj7dIaoGpCfUHgYaw5Bi_zus05SU_ZnJ3Armva6ctGu4oRDlC5nxFB8Z1dUpZCqF-XLAUTahHa2tD81X9nDsZKrF8jjWseGohq67ha1uyi47JO5C6RT7EENqdo1j33dtHa_rQH18hK5NDE9RYDFzbxJSeNGj86l94xiHxbNroxWKjcKdOja7GDem4pc4gfn6aJG-gCUzQ",
      thumb1Alt: "Close-up of a high-performance car alloy wheel with red brake calipers",
      thumb2Alt:
        "Interior view of a luxury car dashboard featuring carbon fiber trim and digital screens",
      story: [
        "El BMW M4 Competition no es solo una máquina de velocidad; es una declaración de principios. Diseñado para quienes exigen lo extraordinario, este ejemplar fusiona la herencia de las pistas con la sofisticación de la vida urbana moderna.",
        "Cada curva de su carrocería ha sido esculpida por el viento, mientras que su interior envuelve al conductor en una simbiosis perfecta de fibra de carbono y piel Merino de la más alta calidad.",
      ],
      amenities: [
        "Sonido Harman Kardon",
        "Asientos M Sport",
        "Apple CarPlay Inalámbrico",
        "Climatizador 3 Zonas",
      ],
      specs: {
        motor: "3.0L M TwinPower",
        motorDesc:
          "Turbo de 6 cilindros en línea optimizado para alto rendimiento.",
        power: "510 HP",
        powerDesc:
          "Entrega de torque instantáneo de 650 Nm para una respuesta feroz.",
        accel: "3.9s (0-100 km/h)",
        accelDesc:
          "Ingeniería de precisión que desafía la física en cada salida.",
        trans: "M Steptronic 8v",
        transDesc:
          "Cambios ultrarrápidos con sistema Drivelogic integrado.",
      },
      narrativeImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPBxWLXZbGtSLg8IoRg3UKMiQDaBPmXeyF36ddIY-3sxUmmRiGQz8DTK1IkEb5DH6IKgO6j2GeQMzOUcOnUeIjuzIqWIYHdk1LjYot29juCObGJqLYn-TFNtDFR0B5nGSMOtOPX6XHJKhKX2MAZRFQ_2jpeQ9jHXYkyR_fshilXtC5zM45wLHBdoRExLw6L29m0HQRMTb4n3WlHiWTc7U-KazRl7XdkPniRyziOAfjTXUWfxU_KqNb11_fNiYz-Cm9WzbzIMerLwM",
      narrativeImageAlt:
        "The rear view of a luxury car with quad exhaust pipes and sleek LED taillights",
    },
  },
  {
    id: "audi-rs6-avant",
    name: "Audi RS6 Avant",
    price: "€112,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBtXxBxyr44-MMJINQK751H8I5g9DEydNAsazePauW42VgqkA3h_LmdBcPkksgTUnQjvjcOdVChLvJj-S2RUYzOpcAekTPNWA4Pwmjik-FRDt4v8Q25uVFZdqeAEKipuBDy1CqYRwFTcI4XYGyHqtV71TCfH8uZV-yR2T4oRpLP2-cQDSTTUKC6xV1dZduuZhWsqkwfXi2gGVh9aUNmJVQe-d1DnepfnvGPVKRr4KGde5tXpnV6286WqclemwTvQRMx_bcAutvKZ50",
    imageAlt:
      "White Audi RS6 Avant in a high-tech underground garage with clean white neon lighting",
    year: "2022",
    km: "28,000 KM",
    tag3: "Quattro",
    engineShort: "V8 TFSI",
    fuel: "Híbrido",
    detail: {
      heroBadge: "Quattro",
      heroSubtitle: "MODELO 2022 • 28,000 KM • AVANT PERFORMANCE",
      priceLine: "€112,000",
      mainImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBtXxBxyr44-MMJINQK751H8I5g9DEydNAsazePauW42VgqkA3h_LmdBcPkksgTUnQjvjcOdVChLvJj-S2RUYzOpcAekTPNWA4Pwmjik-FRDt4v8Q25uVFZdqeAEKipuBDy1CqYRwFTcI4XYGyHqtV71TCfH8uZV-yR2T4oRpLP2-cQDSTTUKC6xV1dZduuZhWsqkwfXi2gGVh9aUNmJVQe-d1DnepfnvGPVKRr4KGde5tXpnV6286WqclemwTvQRMx_bcAutvKZ50",
      thumb1:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBnBR7Qn5hmJIR-P1VG8QX_tEmXFnSVGdMKFCZMI-bwhpGRoNl3q3bFMoFRtGHXLNk3xkXahPy4e5-OsYOZwYMthlc7vHzsfLtju8mzq1GJ8fy9YHsKwG_Ru8ceR8L15sN8d1_vB9LZcYK6gT0hD6Ugp3rEu_DbZtlWREMphI0sByvF3SYWku6_50PqXLyCIHOQxwYZqw8-2rzw9dCswL7WAB0e1TrBovEwg79ODSTC36r9j1bSy9NyXwF11sWhIpUEAE_6YL5f8r0",
      thumb2:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCI8soF09qTOGBeQQfFMGvU04mIgoXii7Eq288moDm-A-CViz446N_CCdMvDlLJCrwNeANj7dIaoGpCfUHgYaw5Bi_zus05SU_ZnJ3Armva6ctGu4oRDlC5nxFB8Z1dUpZCqF-XLAUTahHa2tD81X9nDsZKrF8jjWseGohq67ha1uyi47JO5C6RT7EENqdo1j33dtHa_rQH18hK5NDE9RYDFzbxJSeNGj86l94xiHxbNroxWKjcKdOja7GDem4pc4gfn6aJG-gCUzQ",
      thumb1Alt: "Audi RS6 alloy wheels and brakes",
      thumb2Alt: "Audi RS6 interior with virtual cockpit",
      story: [
        "El Audi RS6 Avant equilibra la practicidad familiar con un V8 biturbo que redefine el segmento. Una silueta icónica y un habitáculo orientado al conductor.",
        "Cada trayecto combina tracción quattro, sonido deportivo y acabados RS para una experiencia premium consistente con la curaduría Oto Motor.",
      ],
      amenities: [
        "Matrix LED",
        "Bang & Olufsen",
        "Asientos RS deportivos",
        "Suspensión adaptativa RS",
      ],
      specs: {
        motor: "V8 TFSI Biturbo",
        motorDesc: "Arquitectura térmica optimizada para respuesta inmediata.",
        power: "600 HP",
        powerDesc: "Par elevado disponible en un amplio rango de revoluciones.",
        accel: "3.6s (0-100 km/h)",
        accelDesc: "Lanzamiento controlado con tracción integral.",
        trans: "Tiptronic 8v",
        transDesc: "Cambios rápidos con modos de conducción RS.",
      },
      narrativeImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBtXxBxyr44-MMJINQK751H8I5g9DEydNAsazePauW42VgqkA3h_LmdBcPkksgTUnQjvjcOdVChLvJj-S2RUYzOpcAekTPNWA4Pwmjik-FRDt4v8Q25uVFZdqeAEKipuBDy1CqYRwFTcI4XYGyHqtV71TCfH8uZV-yR2T4oRpLP2-cQDSTTUKC6xV1dZduuZhWsqkwfXi2gGVh9aUNmJVQe-d1DnepfnvGPVKRr4KGde5tXpnV6286WqclemwTvQRMx_bcAutvKZ50",
      narrativeImageAlt: "Audi RS6 Avant rear three-quarter view",
    },
  },
  {
    id: "mercedes-amg-c63",
    name: "Mercedes-AMG C63",
    price: "€76,900",
    badge: { text: "Certificado", variant: "dark" },
    year: "2021",
    km: "45,200 KM",
    tag3: "RWD",
    engineShort: "V8 Biturbo",
    fuel: "Gasolina",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5QloK2uPHTCXbDx4mBh21bew6Ys64KBTrjVv5-d1kdHTVDHeqDlnYGHNrT-V4DX1XavvrX8KBkqZ7hAjgrt-tvLw7BMGw5noQFXxVaEDBLoDpz2YQnys46R7NvVOmCu32iDHuNj6CE8NnHo4OXYXaIPobSi7bZFCkO4c1ngI2ndK5AAE77Rc4SyNagBng_Sp7oBNDY-l1RN1lYQaAp5pl5phWq3f19YEZMhiZJgkoDTucW_iP0TrUwS9iZnqmGdHobRdXaZ8lmq0",
    imageAlt:
      "Dark gray Mercedes-AMG C63 on a mountain road during sunrise with soft lens flare",
    detail: {
      heroBadge: "Certificado",
      heroSubtitle: "MODELO 2021 • 45,200 KM • AMG PERFORMANCE",
      priceLine: "€76,900",
      mainImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC5QloK2uPHTCXbDx4mBh21bew6Ys64KBTrjVv5-d1kdHTVDHeqDlnYGHNrT-V4DX1XavvrX8KBkqZ7hAjgrt-tvLw7BMGw5noQFXxVaEDBLoDpz2YQnys46R7NvVOmCu32iDHuNj6CE8NnHo4OXYXaIPobSi7bZFCkO4c1ngI2ndK5AAE77Rc4SyNagBng_Sp7oBNDY-l1RN1lYQaAp5pl5phWq3f19YEZMhiZJgkoDTucW_iP0TrUwS9iZnqmGdHobRdXaZ8lmq0",
      thumb1:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBnBR7Qn5hmJIR-P1VG8QX_tEmXFnSVGdMKFCZMI-bwhpGRoNl3q3bFMoFRtGHXLNk3xkXahPy4e5-OsYOZwYMthlc7vHzsfLtju8mzq1GJ8fy9YHsKwG_Ru8ceR8L15sN8d1_vB9LZcYK6gT0hD6Ugp3rEu_DbZtlWREMphI0sByvF3SYWku6_50PqXLyCIHOQxwYZqw8-2rzw9dCswL7WAB0e1TrBovEwg79ODSTC36r9j1bSy9NyXwF11sWhIpUEAE_6YL5f8r0",
      thumb2:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCI8soF09qTOGBeQQfFMGvU04mIgoXii7Eq288moDm-A-CViz446N_CCdMvDlLJCrwNeANj7dIaoGpCfUHgYaw5Bi_zus05SU_ZnJ3Armva6ctGu4oRDlC5nxFB8Z1dUpZCqF-XLAUTahHa2tD81X9nDsZKrF8jjWseGohq67ha1uyi47JO5C6RT7EENqdo1j33dtHa_rQH18hK5NDE9RYDFzbxJSeNGj86l94xiHxbNroxWKjcKdOja7GDem4pc4gfn6aJG-gCUzQ",
      thumb1Alt: "AMG wheel detail",
      thumb2Alt: "AMG Performance steering wheel and cockpit",
      story: [
        "El Mercedes-AMG C63 traduce la filosofía “One Man – One Engine” en un sedán diario con ADN de circuito.",
        "Sonido V8, chasis afilado y un interior que combina microfibra AMG con tecnología MBUX.",
      ],
      amenities: [
        "MBUX multimedia",
        "Asientos AMG Performance",
        "Escape deportivo AMG",
        "Paquete aerodinámico AMG",
      ],
      specs: {
        motor: "V8 Biturbo AMG",
        motorDesc: "Respuesta lineal con carácter deportivo AMG.",
        power: "510 HP",
        powerDesc: "Par elevado para salidas explosivas.",
        accel: "4.0s (0-100 km/h)",
        accelDesc: "Trasera motriz y control de lanzamiento.",
        trans: "AMG SPEEDSHIFT 9G",
        transDesc: "Cambios rápidos con modos Race.",
      },
      narrativeImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC5QloK2uPHTCXbDx4mBh21bew6Ys64KBTrjVv5-d1kdHTVDHeqDlnYGHNrT-V4DX1XavvrX8KBkqZ7hAjgrt-tvLw7BMGw5noQFXxVaEDBLoDpz2YQnys46R7NvVOmCu32iDHuNj6CE8NnHo4OXYXaIPobSi7bZFCkO4c1ngI2ndK5AAE77Rc4SyNagBng_Sp7oBNDY-l1RN1lYQaAp5pl5phWq3f19YEZMhiZJgkoDTucW_iP0TrUwS9iZnqmGdHobRdXaZ8lmq0",
      narrativeImageAlt: "Mercedes-AMG C63 rear view",
    },
  },
  {
    id: "porsche-macan-s",
    name: "Porsche Macan S",
    price: "€62,000",
    year: "2020",
    km: "58,000 KM",
    tag3: "AWD",
    engineShort: "V6 Turbo",
    fuel: "Gasolina",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQivGkl0ICACJ7qzP10Aj-AHn-dz1jD0hG6XJZ7gg9ugPj6D3rMoukL0hhhDYxxO0-HcljInPJ226wboZtLgu2ZHILoX98KCOjCtxpNv-MS147H_f7KGk8mcYU0bQYzNgGtVHg7RNu-gxmizH60cxujDLv8RnVsVO10EuqwOZuQRzHtJYOUZAQHThZp8K-G_iLU9Q9dqhfSZdVCc2JmSlA5JiYX1m3zIbGQvQFtxu-sb3Q2vVxE8kOuuSj0hOcUDOlbeljdg4HzM8",
    imageAlt:
      "Silver Porsche Macan S driving through a misty pine forest road with damp asphalt",
    detail: {
      heroBadge: "Porsche Approved",
      heroSubtitle: "MODELO 2020 • 58,000 KM • SUV SPORT",
      priceLine: "€62,000",
      mainImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQivGkl0ICACJ7qzP10Aj-AHn-dz1jD0hG6XJZ7gg9ugPj6D3rMoukL0hhhDYxxO0-HcljInPJ226wboZtLgu2ZHILoX98KCOjCtxpNv-MS147H_f7KGk8mcYU0bQYzNgGtVHg7RNu-gxmizH60cxujDLv8RnVsVO10EuqwOZuQRzHtJYOUZAQHThZp8K-G_iLU9Q9dqhfSZdVCc2JmSlA5JiYX1m3zIbGQvQFtxu-sb3Q2vVxE8kOuuSj0hOcUDOlbeljdg4HzM8",
      thumb1:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBnBR7Qn5hmJIR-P1VG8QX_tEmXFnSVGdMKFCZMI-bwhpGRoNl3q3bFMoFRtGHXLNk3xkXahPy4e5-OsYOZwYMthlc7vHzsfLtju8mzq1GJ8fy9YHsKwG_Ru8ceR8L15sN8d1_vB9LZcYK6gT0hD6Ugp3rEu_DbZtlWREMphI0sByvF3SYWku6_50PqXLyCIHOQxwYZqw8-2rzw9dCswL7WAB0e1TrBovEwg79ODSTC36r9j1bSy9NyXwF11sWhIpUEAE_6YL5f8r0",
      thumb2:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCI8soF09qTOGBeQQfFMGvU04mIgoXii7Eq288moDm-A-CViz446N_CCdMvDlLJCrwNeANj7dIaoGpCfUHgYaw5Bi_zus05SU_ZnJ3Armva6ctGu4oRDlC5nxFB8Z1dUpZCqF-XLAUTahHa2tD81X9nDsZKrF8jjWseGohq67ha1uyi47JO5C6RT7EENqdo1j33dtHa_rQH18hK5NDE9RYDFzbxJSeNGj86l94xiHxbNroxWKjcKdOja7GDem4pc4gfn6aJG-gCUzQ",
      thumb1Alt: "Porsche Macan wheel",
      thumb2Alt: "Porsche Macan interior",
      story: [
        "El Macan S aporta el ADN Porsche a un formato SUV: dirección precisa y chasis equilibrado.",
        "Ideal para quien busca versatilidad diaria sin renunciar a la estética deportiva de la marca.",
      ],
      amenities: [
        "PCM con navegación",
        "PASM",
        "Techo panorámico",
        "Paquete Sport Chrono",
      ],
      specs: {
        motor: "V6 Turbo",
        motorDesc: "Respuesta progresiva con sonido característico.",
        power: "380 HP",
        powerDesc: "Par disponible para rebases seguros.",
        accel: "5.3s (0-100 km/h)",
        accelDesc: "Tracción integral y gestión electrónica.",
        trans: "PDK 7",
        transDesc: "Doble embrague con cambios ultrarrápidos.",
      },
      narrativeImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQivGkl0ICACJ7qzP10Aj-AHn-dz1jD0hG6XJZ7gg9ugPj6D3rMoukL0hhhDYxxO0-HcljInPJ226wboZtLgu2ZHILoX98KCOjCtxpNv-MS147H_f7KGk8mcYU0bQYzNgGtVHg7RNu-gxmizH60cxujDLv8RnVsVO10EuqwOZuQRzHtJYOUZAQHThZp8K-G_iLU9Q9dqhfSZdVCc2JmSlA5JiYX1m3zIbGQvQFtxu-sb3Q2vVxE8kOuuSj0hOcUDOlbeljdg4HzM8",
      narrativeImageAlt: "Porsche Macan S exterior",
    },
  },
  {
    id: "bmw-x5-m-competition",
    name: "BMW X5 M Competition",
    price: "€129,000",
    badge: { text: "Bajo Kilometraje", variant: "primary" },
    year: "2024",
    km: "5,200 KM",
    tag3: "xDrive",
    engineShort: "V8 TwinPower",
    fuel: "Gasolina",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-V8Q4jLGqVhjlEqmsdScdKUnO1yD29ZOtr0oBvRpFWRzJ_6rbtxXOwJfw9Gsiyk6zsQV4okXOAQNRVYl-g65wRDcYO10-K3HahXPEmzRoucb6s_jtuDdsvJtdwK4Y0QGqjF8bLu74gAfArBCipofWTBgj02ZxYwdQZ-Bin5NZrbJNCtNYqZ5OQ35y_EbEEvZ9e0XIAFJh2SoQuhAHRI3kX0LelwTTc-_1ZLYcQGCny0XWZJqEjf3Fjm9vCYoDpSVtO6ePm-zKoI0",
    imageAlt:
      "Chalk white BMW X5 M parked on a minimalist driveway with architectural modern villa",
    detail: {
      heroBadge: "Bajo Kilometraje",
      heroSubtitle: "MODELO 2024 • 5,200 KM • SUV M",
      priceLine: "€129,000",
      mainImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA-V8Q4jLGqVhjlEqmsdScdKUnO1yD29ZOtr0oBvRpFWRzJ_6rbtxXOwJfw9Gsiyk6zsQV4okXOAQNRVYl-g65wRDcYO10-K3HahXPEmzRoucb6s_jtuDdsvJtdwK4Y0QGqjF8bLu74gAfArBCipofWTBgj02ZxYwdQZ-Bin5NZrbJNCtNYqZ5OQ35y_EbEEvZ9e0XIAFJh2SoQuhAHRI3kX0LelwTTc-_1ZLYcQGCny0XWZJqEjf3Fjm9vCYoDpSVtO6ePm-zKoI0",
      thumb1:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBnBR7Qn5hmJIR-P1VG8QX_tEmXFnSVGdMKFCZMI-bwhpGRoNl3q3bFMoFRtGHXLNk3xkXahPy4e5-OsYOZwYMthlc7vHzsfLtju8mzq1GJ8fy9YHsKwG_Ru8ceR8L15sN8d1_vB9LZcYK6gT0hD6Ugp3rEu_DbZtlWREMphI0sByvF3SYWku6_50PqXLyCIHOQxwYZqw8-2rzw9dCswL7WAB0e1TrBovEwg79ODSTC36r9j1bSy9NyXwF11sWhIpUEAE_6YL5f8r0",
      thumb2:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCI8soF09qTOGBeQQfFMGvU04mIgoXii7Eq288moDm-A-CViz446N_CCdMvDlLJCrwNeANj7dIaoGpCfUHgYaw5Bi_zus05SU_ZnJ3Armva6ctGu4oRDlC5nxFB8Z1dUpZCqF-XLAUTahHa2tD81X9nDsZKrF8jjWseGohq67ha1uyi47JO5C6RT7EENqdo1j33dtHa_rQH18hK5NDE9RYDFzbxJSeNGj86l94xiHxbNroxWKjcKdOja7GDem4pc4gfn6aJG-gCUzQ",
      thumb1Alt: "BMW X5 M wheel",
      thumb2Alt: "BMW X5 M interior",
      story: [
        "El X5 M Competition concentra el V8 M TwinPower en un SUV de altísima performance.",
        "Espacio, tecnología BMW y un chasis M para uso diario sin concesiones.",
      ],
      amenities: [
        "Bowers & Wilkins",
        "Asientos M multifunción",
        "Asistente de conducción Pro",
        "Diferencial M activo",
      ],
      specs: {
        motor: "V8 TwinPower M",
        motorDesc: "Dos turbos para entrega brutal y sonido M.",
        power: "625 HP",
        powerDesc: "Par masivo para aceleraciones lineales.",
        accel: "3.9s (0-100 km/h)",
        accelDesc: "xDrive y control de tracción M.",
        trans: "M Steptronic 8v",
        transDesc: "Modos Sport Plus y configuración M.",
      },
      narrativeImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA-V8Q4jLGqVhjlEqmsdScdKUnO1yD29ZOtr0oBvRpFWRzJ_6rbtxXOwJfw9Gsiyk6zsQV4okXOAQNRVYl-g65wRDcYO10-K3HahXPEmzRoucb6s_jtuDdsvJtdwK4Y0QGqjF8bLu74gAfArBCipofWTBgj02ZxYwdQZ-Bin5NZrbJNCtNYqZ5OQ35y_EbEEvZ9e0XIAFJh2SoQuhAHRI3kX0LelwTTc-_1ZLYcQGCny0XWZJqEjf3Fjm9vCYoDpSVtO6ePm-zKoI0",
      narrativeImageAlt: "BMW X5 M Competition rear",
    },
  },
  {
    id: "audi-rs3-sportback",
    name: "Audi RS3 Sportback",
    price: "€68,500",
    year: "2022",
    km: "18,900 KM",
    tag3: "S-Tronic",
    engineShort: "5 Cilindros",
    fuel: "Gasolina",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOEBneeau0t1IARuoGEhC916M9csUMIElmgHvJgLeRiEfNFqp1hkRqqbAJq_CDL2_EXzJTdr48xF0o8zzsjCt2IhT74cUOQCKuKSx_P0AiF6VsXiJ55Jjg6ZZoGiCV3HiayPDC4g_KkXZ_lwWaqUKVGTmiJlqsLXW-zNju7ff_Cd7U1fRlt_O6xyK6CndLpDqHySQX9nwTIP7r3DssViGTGiLpMpVN7S8w4wlrgtOkI-cM3xFTpO_rqaiIjKg2mmv5s2Px4CHnFqU",
    imageAlt:
      "Nardo gray Audi RS3 Sportback launching on a test track with tire smoke",
    detail: {
      heroBadge: "5 Cilindros",
      heroSubtitle: "MODELO 2022 • 18,900 KM • RS SPORTBACK",
      priceLine: "€68,500",
      mainImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCOEBneeau0t1IARuoGEhC916M9csUMIElmgHvJgLeRiEfNFqp1hkRqqbAJq_CDL2_EXzJTdr48xF0o8zzsjCt2IhT74cUOQCKuKSx_P0AiF6VsXiJ55Jjg6ZZoGiCV3HiayPDC4g_KkXZ_lwWaqUKVGTmiJlqsLXW-zNju7ff_Cd7U1fRlt_O6xyK6CndLpDqHySQX9nwTIP7r3DssViGTGiLpMpVN7S8w4wlrgtOkI-cM3xFTpO_rqaiIjKg2mmv5s2Px4CHnFqU",
      thumb1:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBnBR7Qn5hmJIR-P1VG8QX_tEmXFnSVGdMKFCZMI-bwhpGRoNl3q3bFMoFRtGHXLNk3xkXahPy4e5-OsYOZwYMthlc7vHzsfLtju8mzq1GJ8fy9YHsKwG_Ru8ceR8L15sN8d1_vB9LZcYK6gT0hD6Ugp3rEu_DbZtlWREMphI0sByvF3SYWku6_50PqXLyCIHOQxwYZqw8-2rzw9dCswL7WAB0e1TrBovEwg79ODSTC36r9j1bSy9NyXwF11sWhIpUEAE_6YL5f8r0",
      thumb2:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCI8soF09qTOGBeQQfFMGvU04mIgoXii7Eq288moDm-A-CViz446N_CCdMvDlLJCrwNeANj7dIaoGpCfUHgYaw5Bi_zus05SU_ZnJ3Armva6ctGu4oRDlC5nxFB8Z1dUpZCqF-XLAUTahHa2tD81X9nDsZKrF8jjWseGohq67ha1uyi47JO5C6RT7EENqdo1j33dtHa_rQH18hK5NDE9RYDFzbxJSeNGj86l94xiHxbNroxWKjcKdOja7GDem4pc4gfn6aJG-gCUzQ",
      thumb1Alt: "Audi RS3 wheel",
      thumb2Alt: "Audi RS3 interior RS",
      story: [
        "El RS3 Sportback es el punto de encuentro entre compacto urbano y mecánica de rally.",
        "El cinco cilindros ofrece una firma sonora única y una agilidad notable en carretera.",
      ],
      amenities: [
        "Audi virtual cockpit plus",
        "Sonido B&O",
        "Asientos RS bucket",
        "Modo RS Performance",
      ],
      specs: {
        motor: "5 cilindros TFSI",
        motorDesc: "Herencia de competición con turbo de geometría variable.",
        power: "400 HP",
        powerDesc: "Respuesta explosiva y tracción quattro.",
        accel: "3.8s (0-100 km/h)",
        accelDesc: "Lanzamiento con control de tracción RS.",
        trans: "S tronic 7",
        transDesc: "Cambios secuenciales al volante.",
      },
      narrativeImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCOEBneeau0t1IARuoGEhC916M9csUMIElmgHvJgLeRiEfNFqp1hkRqqbAJq_CDL2_EXzJTdr48xF0o8zzsjCt2IhT74cUOQCKuKSx_P0AiF6VsXiJ55Jjg6ZZoGiCV3HiayPDC4g_KkXZ_lwWaqUKVGTmiJlqsLXW-zNju7ff_Cd7U1fRlt_O6xyK6CndLpDqHySQX9nwTIP7r3DssViGTGiLpMpVN7S8w4wlrgtOkI-cM3xFTpO_rqaiIjKg2mmv5s2Px4CHnFqU",
      narrativeImageAlt: "Audi RS3 Sportback rear",
    },
  },
];

export function getVehicle(id: string) {
  return vehicles.find((v) => v.id === id);
}
