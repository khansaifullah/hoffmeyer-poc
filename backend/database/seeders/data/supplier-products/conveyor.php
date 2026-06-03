<?php

use Database\Seeders\CatalogSupplierProducts as S;
use Database\Seeders\SupplierProductDefinition as P;

return [
    P::make(S::SLUG_BELT_HEAVY, 'EP Conveyor Belt (EP100–EP600)', [
        'slug' => 'ep-conveyor-belt-ep100-ep600',
        'description' => 'EP (polyester) conveyor belt constructed from multiple layers of polyester sailcloth covered with quality rubber. Suitable for conveying bulk, bagged, powder, granule, and general materials over long distances. Features good elasticity, low elongation, and high stability.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Fabric Material', 'value' => 'Polyester canvas — warp: polyester / weft: nylon or polyester'],
            ['label' => 'Grades', 'value' => 'EP100 through EP600 (2–10 plies; width 350–2000 mm; length 10–400 m)'],
            ['label' => 'Cover Thickness', 'value' => 'Top cover 2–12 mm; bottom cover 1–5 mm (grade dependent)'],
            ['label' => 'Standards', 'value' => 'GB/T7984-2001, DIN22102, BS490, AS1332, RMA, JISK6322, SABS1173'],
            ['label' => 'Variants', 'value' => 'General use, fire-retardant, cold-resistant, wear-resistant, heat-resistant, acid/alkali-resistant, oil-resistant, antistatic, high-grade'],
            ['label' => 'Key Features', 'value' => 'Light weight, high tensile strength, fatigue and wear resistance, water/steam/chemical erosion resistance, excellent groove formation, low elongation'],
        ],
    ]),
    P::make(S::SLUG_BELT_HEAVY, 'NN Conveyor Belt (NN100–NN600)', [
        'slug' => 'nn-conveyor-belt-nn100-nn600',
        'description' => 'Nylon conveyor belt characterized by thin belt carcass, high strength, shock resistance, large layer-to-layer adhesion, excellent flexibility and long service life. Best suited for conveying heavy products at high speed over middle and short distances.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Fabric Material', 'value' => 'Nylon canvas — warp: nylon / weft: nylon'],
            ['label' => 'Grades', 'value' => 'NN100 through NN600 (2–10 plies; width 350–2000 mm; length 1–300 m)'],
            ['label' => 'Adhesive Strength Between Plies', 'value' => 'Average ≥4.5 N/mm; peak min ≥3.9 N/mm; peak max 20 N/mm'],
            ['label' => 'Standards', 'value' => 'GB/T 7984-2001, DIN22102, BS490, AS1332, RMA, JISK6322, SABS1173'],
            ['label' => 'Variants', 'value' => 'General use, fire-resistant, cold-resistant, wear-resistant, heat-resistant, acid/alkali-resistant, oil-resistant, antistatic, high-grade'],
        ],
    ]),
    P::make(S::SLUG_BELT_HEAVY, 'Steel Cord Conveyor Belt (ST-630 to ST-6300)', [
        'slug' => 'steel-cord-conveyor-belt-st630-st6300',
        'description' => 'For high-strength, long-distance, heavy-load material transportation. Also used for high-strength short-distance transport in special applications such as mining, ports, and power plants.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Grade Range', 'value' => 'ST-630 through ST-6300'],
            ['label' => 'Key Features', 'value' => 'High tensile strength, small elongation, small drive pulley diameter, high rubber-to-steel cord adhesion, even cord tension, good troughability'],
            ['label' => 'Example Grade ST-1000', 'value' => 'Cord 4.0 mm 6×7+1WS @ 12 mm pitch; working tension 140 N/mm; cover 6×6 mm; min pulley 800 mm'],
            ['label' => 'Cover Rubber (Class H)', 'value' => 'Tensile strength ≥17.65 MPa; elongation ≥450%; abrasion ≤0.6 cm³/1.61 km'],
            ['label' => 'Cover Rubber (Class M)', 'value' => 'Tensile strength ≥13.73 MPa; elongation ≥400%; abrasion ≤0.8 cm³/1.61 km'],
        ],
    ]),
    P::make(S::SLUG_BELT_INCLINE, 'Chevron Conveyor Belt', [
        'slug' => 'chevron-conveyor-belt',
        'description' => 'Conveyor belt with chevron (V-shaped) profiled rubber surface on the carrying side. Increases friction between belt and material, preventing slippage during conveyance. Especially suitable for materials with large inclination angles or smooth surfaces.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Application', 'value' => 'Incline conveying; materials that would slip on flat belt surfaces'],
            ['label' => 'Key Feature', 'value' => 'Chevron profile enables steep-angle conveying where flat belts fail'],
        ],
    ]),
    P::make(S::SLUG_BELT_INCLINE, 'Rough Top Conveyor Belt', [
        'slug' => 'rough-top-conveyor-belt',
        'description' => 'Two or three ply belt with cut edges, carcass of NN/EP fabric, with top cover made of wear-resistant rubber featuring a non-slip textured surface.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Application', 'value' => 'Light-weight goods (sacks, boxes, parcels) on inclines up to 35°; package and labeling conveyors'],
            ['label' => 'Cover Colors', 'value' => 'Black (utility); tan (non-marking for packaged food)'],
            ['label' => 'Key Features', 'value' => 'Excellent grip, cushioning effect, prevents slipping while protecting package surfaces'],
        ],
    ]),
    P::make(S::SLUG_BELT_WOVEN, 'Straight Warp Conveyor Belt (SW315–SW800)', [
        'slug' => 'straight-warp-conveyor-belt-sw315-sw800',
        'description' => 'Single-ply belt constructed with a unique straight-warp carcass. Designed for high capacity material handling with superior endurance in rugged environments.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Tension Ratings', 'value' => '175 PIW (SW315) through 440 PIW (SW800)'],
            ['label' => 'Carcass Gauge', 'value' => '0.098 in. (SW315) to 0.142 in. (SW800)'],
            ['label' => 'Key Features', 'value' => 'Higher unit strength than multi-ply, abrasion/cut/snag resistance, ~0% elongation at 10% load, long-distance suitable'],
        ],
    ]),
    P::make(S::SLUG_BELT_HEAVY, 'Oil Resistant Conveyor Belt (OR/MOR/OHR)', [
        'slug' => 'oil-resistant-conveyor-belt',
        'description' => 'Conveyor belt with NBR (nitrile rubber) cover compound providing excellent oil and organic solvent resistance. Prevents cover swelling, flaking, and reverse-through when conveying oily materials.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Application', 'value' => 'Materials containing oil or organic solvents; chemicals, pulp, pottery, foodstuff, fertilizer'],
            ['label' => 'Grade OR', 'value' => '15 MPa tensile; 300% elongation; 150 mm³ abrasion; NBR blended; -30°C to +60°C'],
            ['label' => 'Grade MOR', 'value' => '12 MPa tensile; 300 mm³ abrasion; -30°C to +50°C'],
            ['label' => 'Grade OHR', 'value' => '15 MPa tensile; 400% elongation; up to +100°C for lumps'],
        ],
    ]),
    P::make(S::SLUG_BELT_HEAVY, 'Heat Resistant Conveyor Belt (T1–T4)', [
        'slug' => 'heat-resistant-conveyor-belt-t1-t4',
        'description' => 'Multilayer rubber cotton canvas (polyester cotton) with high-temperature-resistant rubber compounds, bonded through high-temperature vulcanization. For coke, cement, clinker, and hot castings.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Standard', 'value' => 'HG2297-92'],
            ['label' => 'Type T1', 'value' => 'Test ≤100°C; max short-time 150°C'],
            ['label' => 'Type T2', 'value' => 'Test ≤125°C; max short-time 170°C'],
            ['label' => 'Type T3', 'value' => 'Test ≤150°C; max short-time 200°C'],
            ['label' => 'Type T4', 'value' => 'Test ≤175°C; max short-time 230°C'],
            ['label' => 'Abrasive Wear', 'value' => 'First quality 0.8–1.0 cm³/1.61 km depending on type'],
        ],
    ]),
    P::make(S::SLUG_BELT_HEAVY, 'Fire Resistant Conveyor Belt', [
        'slug' => 'fire-resistant-conveyor-belt',
        'description' => 'Fire-retardant and static-conductive belt using nylon or EP carcass. Suitable for power, chemical, light, metallurgical, and grain industries in flammable or explosive environments including coal mines.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Cover Standards', 'value' => 'SANS-F, IS-1891 (FR), ISO-340 (FR), AS-F, AS-1332 (FR), DIN S/K, MSHA-FR, CAN/CSA (FR)'],
            ['label' => 'Cover Rubber', 'value' => 'Tensile strength ≥18 MPa; elongation ≥450%; abrasion ≤200 mm³'],
        ],
    ]),
];
