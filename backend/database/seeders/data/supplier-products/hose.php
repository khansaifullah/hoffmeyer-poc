<?php

use Database\Seeders\CatalogSupplierProducts as S;
use Database\Seeders\SupplierProductDefinition as P;

$hose = static function (
    string $slug,
    string $name,
    string $description,
    string $source,
    string $sourceUrl,
    string $subcategory = S::SLUG_MATERIAL_HANDLING,
    array $extraSpecs = [],
    ?string $material = 'Rubber'
) {
    return P::make($subcategory, $name, [
        'slug' => $slug,
        'description' => $description,
        'material' => $material,
        'source' => $source,
        'source_url' => $sourceUrl,
        'specs' => $extraSpecs,
    ]);
};

return array_merge(
    [
        $hose('air-seeder-suction-hose', 'Air Seeder Suction Hose', 'Hardwall mandrel-built hose for dry conveyance of seeds and other materials. Medium duty abrasion service.', 'Wellcall Hose (M) Sdn Bhd', 'wellcall.com.my', S::SLUG_MATERIAL_HANDLING, [
            ['label' => 'Application', 'value' => 'Agricultural seeder equipment — pneumatic seed transfer'],
            ['label' => 'Temperature', 'value' => '-40°C to +80°C'],
            ['label' => 'Tube', 'value' => 'Black smooth conductive natural rubber, abrasion resistant'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord + helix wire'],
            ['label' => 'Construction', 'value' => 'Mandrel built'],
        ]),
        $hose('bulk-material-discharge-hose', 'Bulk Material Discharge Hose', 'Mandrel-built hose for discharge of bulk dry materials with high abrasion-rated inner lining.', 'Wellcall Hose (M) Sdn Bhd', 'wellcall.com.my'),
        $hose('bulk-material-suction-hose', 'Bulk Material Suction Hose', 'Mandrel-built hose for suction of bulk dry materials such as sand, grain, and granules.', 'Wellcall Hose (M) Sdn Bhd', 'wellcall.com.my'),
        $hose('dust-collector-suction-hose', 'Dust Collector Suction Hose', 'Flexible mandrel-built hose for industrial dust collection and vacuum conveyance.', 'Wellcall Hose (M) Sdn Bhd', 'wellcall.com.my', S::SLUG_DUCTING, [
            ['label' => 'Application', 'value' => 'Industrial dust collection and dry particulate vacuum transfer'],
        ]),
        $hose('mortar-pump-hose', 'Mortar Pump Hose', 'Heavy-duty mandrel-built hose for pumping mortar, plaster, and concrete slurry under pressure.', 'Wellcall Hose (M) Sdn Bhd', 'wellcall.com.my'),
        $hose('plaster-discharge-hose', 'Plaster Discharge Hose', 'Mandrel-built hose for discharge of plaster and cement compounds from plastering equipment.', 'Wellcall Hose (M) Sdn Bhd', 'wellcall.com.my'),
        $hose('rc-drill-discharge-hose', 'RC Drill Discharge Hose', 'Mandrel-built hose for reverse circulation drilling discharge in mining.', 'Wellcall Hose (M) Sdn Bhd', 'wellcall.com.my'),
        $hose('rc-drill-suction-hose', 'RC Drill Suction Hose', 'Mandrel-built hose for suction side of reverse circulation drilling.', 'Wellcall Hose (M) Sdn Bhd', 'wellcall.com.my'),
        $hose('sandblast-hose', 'Sandblast Hose', 'Softwall hose for delivery of steel shots, sand, and abrasive blasting media.', 'Wellcall Hose (M) Sdn Bhd', 'wellcall.com.my', S::SLUG_MATERIAL_HANDLING, [
            ['label' => 'Temperature', 'value' => '-40°C to +80°C'],
            ['label' => 'Tube', 'value' => 'Conductive natural rubber, high abrasion resistant'],
            ['label' => 'Standard', 'value' => 'ISO 3861 (optional)'],
            ['label' => 'Construction', 'value' => 'Softwall mandrel built'],
        ]),
    ],
    array_map(fn (array $row) => $hose(...$row), [
        ['municipal-fire-hose', 'Municipal Fire Hose', 'Attack and supply fire hose for municipal fire department use.', '5ELEM Hi-Tech', 'en.5elem.com', S::SLUG_FIRE_MILL, [['label' => 'Certifications', 'value' => 'FM, UL/ULC, NFPA, EN, DIN, BS, MSHA, NSF, MED, RMRS']]],
        ['supply-fire-hose', 'Supply Fire Hose', 'Large-diameter layflat supply hose from hydrants or tankers to fire apparatus.', '5ELEM Hi-Tech', 'en.5elem.com', S::SLUG_FIRE_MILL],
        ['forestry-fire-hose', 'Forestry Fire Hose', 'Lightweight layflat hose for wildland and forestry firefighting.', '5ELEM Hi-Tech', 'en.5elem.com', S::SLUG_FIRE_MILL],
        ['booster-fire-hose', 'Booster Fire Hose', 'Semi-rigid pre-connected booster hose for fire apparatus reels.', '5ELEM Hi-Tech', 'en.5elem.com', S::SLUG_FIRE_MILL],
        ['rack-cabinet-fire-hose', 'Rack / Cabinet Fire Hose', 'Fire hose for building cabinets and standpipe systems.', '5ELEM Hi-Tech', 'en.5elem.com', S::SLUG_FIRE_MILL],
        ['mine-fire-hose', 'Mine Fire Hose', 'MSHA-rated fire hose for underground and surface mine fire suppression.', '5ELEM Hi-Tech', 'en.5elem.com', S::SLUG_FIRE_MILL, [['label' => 'Certifications', 'value' => 'MSHA approved']]],
        ['industrial-fire-hose-5elem', 'Industrial Fire Hose', 'Heavy-duty fire hose for industrial plant and mill protection.', '5ELEM Hi-Tech', 'en.5elem.com', S::SLUG_FIRE_MILL],
        ['double-jacket-fire-hose', 'Double Jacket Fire Hose', 'Two woven jackets with vulcanized liner for high working pressure and abrasion resistance.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL, [
            ['label' => 'Inner Diameters', 'value' => '16–150 mm'],
            ['label' => 'Working Pressure', 'value' => '10–25 bar'],
            ['label' => 'Liner Options', 'value' => 'PVC, natural rubber, synthetic rubber, EPDM'],
        ]],
        ['single-jacket-fire-hose', 'Single Jacket Fire Hose', 'Single woven jacket over rubber or PVC liner for general fire fighting.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL],
        ['rubber-lined-fire-hose', 'Rubber Lined Fire Hose', 'Natural rubber liner with superior acid/alkali and abrasion resistance vs PVC.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL, [
            ['label' => 'Inner Diameters', 'value' => '⅝" through 8"'],
            ['label' => 'Working Pressure', 'value' => '10–21 bar at 23°C'],
        ]],
        ['tpu-layflat-fire-hose', 'TPU Layflat Fire Hose', 'Polyurethane tube with polyester reinforcement; through-the-weave construction.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL, [
            ['label' => 'Single Length', 'value' => '200–400 m per piece'],
            ['label' => 'Weight', 'value' => '~50% lighter than equivalent rubber hose'],
            ['label' => 'Resistance', 'value' => 'Oil, corrosion, abrasion, UV'],
        ]],
        ['epdm-lined-fire-hose', 'EPDM Lined Fire Hose', 'EPDM liner for superior ozone, heat, and chemical resistance.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL],
        ['pvc-fire-hose', 'PVC Fire Hose', 'Economical PVC-lined woven jacket fire hose for light duty applications.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL, [], 'PVC'],
        ['canvas-fire-hose', 'Canvas Fire Hose', 'Traditional unlined woven canvas fire hose.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL],
        ['rubber-covered-fire-hose', 'Rubber Covered Fire Hose', 'Rubber outer jacket for added abrasion and weather protection.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL],
        ['semi-rigid-fire-hose', 'Semi-Rigid Hose', 'Retains shape when empty for booster reels and pre-connected lines.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL],
        ['silicone-fiberglass-fire-sleeve', 'Silicone Coated Fiberglass Fire Sleeve', 'Braided fiberglass sleeve with silicone coating for hydraulic and fuel line protection.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL, [
            ['label' => 'Temperature Rating', 'value' => 'Up to 260°C continuous / 1000°C short burst'],
        ]],
        ['braided-fire-sleeve', 'Braided Fire Sleeve', 'Protective braided sleeve for hose and cable bundles.', 'Seapeak', 'seapeakhose.com', S::SLUG_FIRE_MILL],
        ['camlock-coupling', 'Camlock Coupling (Cam & Groove)', 'Quick-connect cam and groove coupling (MIL-C-27487).', 'Seapeak', 'seapeakhose.com', S::SLUG_CAM_GROOVE, [
            ['label' => 'Materials', 'value' => 'Aluminum, brass, stainless 304/316, polypropylene'],
            ['label' => 'Types', 'value' => 'A, B, C, D, E, F, DC, DP'],
        ]],
        ['storz-coupling', 'Storz Coupling', 'Symmetrical interlocking fire hose coupling — identical halves.', 'Seapeak', 'seapeakhose.com', S::SLUG_CAM_GROOVE],
        ['bauer-coupling', 'Bauer Coupling', 'Quick-connect coupling for agriculture and industrial water systems.', 'Seapeak', 'seapeakhose.com', S::SLUG_CAM_GROOVE],
        ['air-hose-coupling', 'Air Hose Coupling', 'Push-lock or threaded coupling for compressed air hose.', 'Seapeak', 'seapeakhose.com', S::SLUG_CAM_GROOVE],
        ['blast-hose-coupling', 'Blast Hose Coupling', 'Heavy-duty coupling for sandblast and abrasive blast hose.', 'Seapeak', 'seapeakhose.com', S::SLUG_CAM_GROOVE],
        ['garden-hose-fitting', 'Garden Hose Fitting', 'Standard GHT garden hose fittings and connectors.', 'Seapeak', 'seapeakhose.com', S::SLUG_CAM_GROOVE],
        ['worm-gear-hose-clamp', 'Worm Gear Hose Clamp', 'Standard worm-drive hose clamp in stainless steel band.', 'Seapeak', 'seapeakhose.com', S::SLUG_WORM_CLAMPS],
        ['t-bolt-hose-clamp', 'T-Bolt Hose Clamp', 'Heavy-gauge stainless band with T-bolt for high clamping force.', 'Seapeak', 'seapeakhose.com', S::SLUG_WORM_CLAMPS],
        ['double-bolt-hose-clamp', 'Double Bolt Hose Clamp', 'Two-bolt clamp for large diameter and layflat hose.', 'Seapeak', 'seapeakhose.com', S::SLUG_WORM_CLAMPS],
    ]),
    [
        P::make(S::SLUG_WASHDOWN, 'White Washdown Hose EPDM 3/4" (HSW-75WD)', [
            'slug' => 'white-washdown-hose-hsw-75wd',
            'mfr_number' => 'HSW-75WD',
            'description' => 'EPDM washdown hose for food processing facilities and equipment.',
            'material' => 'EPDM',
            'source' => 'UPD USA',
            'source_url' => 'updusa.com',
            'specs' => [
                ['label' => 'Inner Diameter', 'value' => '3/4"'],
                ['label' => 'Outer Diameter', 'value' => '1-1/4"'],
                ['label' => 'Working Pressure', 'value' => '200 PSI'],
                ['label' => 'Temperature', 'value' => '-40°F to +180°F'],
                ['label' => 'Package', 'value' => '700 ft reels'],
            ],
        ]),
        P::make(S::SLUG_WASHDOWN, 'White Washdown Hose SBR/NBR 1" (HSW-100WD)', [
            'slug' => 'white-washdown-hose-hsw-100wd',
            'mfr_number' => 'HSW-100WD',
            'description' => 'Washdown hose for food processing with SBR tube and NBR/PVC cover.',
            'material' => 'Rubber',
            'source' => 'UPD USA',
            'source_url' => 'updusa.com',
            'specs' => [
                ['label' => 'Inner Diameter', 'value' => '1"'],
                ['label' => 'Working Pressure', 'value' => '100 PSI'],
                ['label' => 'Temperature', 'value' => '-40°F to +180°F'],
                ['label' => 'Package', 'value' => '500 ft reels'],
            ],
        ]),
    ],
    array_map(fn (array $row) => $hose(...$row), [
        ['heavy-duty-orange-suction-hose', 'Heavy Duty Orange Suction Hose', 'Heavy duty rigid PVC suction hose in high-visibility orange.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_WATER_SUCTION, [['label' => 'Material', 'value' => 'PVC']], 'PVC'],
        ['heavy-duty-low-temp-suction-hose', 'Heavy Duty Low-Temperature Suction Hose', 'PVC suction hose rated for low-temperature flexibility.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_WATER_SUCTION, [], 'PVC'],
        ['heavy-duty-clear-suction-hose', 'Heavy Duty Clear Suction Hose', 'Clear PVC suction hose for visual flow confirmation.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_WATER_SUCTION, [], 'PVC'],
        ['heavy-duty-green-suction-hose', 'Heavy Duty Green Suction Hose', 'General-purpose heavy duty green PVC suction hose.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_WATER_SUCTION, [], 'PVC'],
        ['medium-duty-clear-suction-hose', 'Medium Duty Clear Suction Hose', 'Medium duty clear PVC suction and transfer hose.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_WATER_SUCTION, [], 'PVC'],
        ['medium-duty-green-suction-hose', 'Medium Duty Green Suction Hose', 'Medium duty green PVC suction hose.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_WATER_SUCTION, [], 'PVC'],
        ['low-temp-suction-hose-maxflex', 'Low-Temp Suction Hose', 'PVC suction hose for very low temperature applications.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_WATER_SUCTION, [], 'PVC'],
        ['heavy-duty-food-grade-suction-pvc', 'Heavy Duty Food Grade Suction Hose (PVC)', 'Food-safe PVC heavy duty suction hose.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_FOOD_RUBBER, [['label' => 'Compliance', 'value' => 'Food grade rated']], 'PVC'],
        ['food-grade-general-suction-hose', 'Food Grade General Suction Hose', 'PVC or PU food grade general suction hose.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_FOOD_RUBBER, [], 'PVC'],
        ['food-grade-suction-static-wire', 'Food Grade Suction Hose with Static Wire', 'Food grade suction with embedded static-dissipating wire.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_FOOD_RUBBER],
        ['heavy-duty-food-grade-suction-rubber', 'Heavy Duty Food Grade Suction Hose (Rubber)', 'Heavy duty rubber food grade suction for dairy and brewery.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_FOOD_RUBBER],
        ['pe-eva-central-vacuum-hose', 'PE/EVA Central Vacuum Hose', 'Lightweight PE/EVA hose for central vacuum and ducting.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_DUCTING, [['label' => 'Material', 'value' => 'PE / EVA']], 'Synthetic'],
        ['material-handling-hose-pvc-pu', 'Material Handling Hose — PVC/PU', 'PVC or PU hose for dust, powder, and chip conveyance.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_MATERIAL_HANDLING, [], 'PVC'],
        ['material-handling-hose-rubber', 'Material Handling Hose — Rubber', 'Rubber hose for abrasive bulk material handling.', 'Maxflex Corporation', 'maxflex.co.kr', S::SLUG_MATERIAL_HANDLING],
        ['fracking-oilfield-tpu-layflat', 'Fracking / Oilfield TPU Layflat Hose', 'Polyester jacket with TPU liner for fracking and oilfield water transfer.', '5ELEM Hi-Tech', 'en.5elem.com', S::SLUG_PETROLEUM, [['label' => 'Construction', 'value' => 'Woven polyester jacket + rubber or TPU liner']]],
        ['oil-hose-5elem', 'Oil Hose', 'Hose for oil and petroleum product conveyance at well sites and refineries.', '5ELEM Hi-Tech', 'en.5elem.com', S::SLUG_PETROLEUM],
    ])
);
