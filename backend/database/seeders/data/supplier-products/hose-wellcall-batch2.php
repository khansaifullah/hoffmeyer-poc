<?php

use Database\Seeders\CatalogSupplierProducts as S;
use Database\Seeders\SupplierProductDefinition as P;

$wellcall = 'Wellcall Hose (M) Sdn Bhd';
$wellcallUrl = 'wellcall.com.my';

$hose = static function (
    string $slug,
    string $name,
    string $description,
    string $subcategory,
    array $specs = [],
    ?string $material = 'Rubber'
) use ($wellcall, $wellcallUrl) {
    return P::make($subcategory, $name, [
        'slug' => $slug,
        'description' => $description,
        'material' => $material,
        'brand' => 'Wellcall',
        'source' => $wellcall,
        'source_url' => $wellcallUrl,
        'specs' => $specs,
    ]);
};

return array_merge(
    [
        $hose('compressed-air-hose-mandrel-built', 'Compressed Air Hose — Mandrel Built', 'Mandrel-built compressed air hose for industries, construction sites, and mines.', S::SLUG_AIR_RUBBER, [
            ['label' => 'MFR Reference', 'value' => 'ISO 2398'],
            ['label' => 'Construction', 'value' => 'Mandrel built'],
            ['label' => 'Temperature', 'value' => '-40°C to +70°C'],
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber, oil mist resistant'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord'],
            ['label' => 'Cover', 'value' => 'Yellow smooth (wrapped finish), weathering resistant'],
        ]),
        $hose('fras-air-water-hose', 'FRAS Air / Water Hose', 'Fire Resistant Anti-Static (FRAS) rated air/water hose for underground mining environments where fire and static risks are critical. Dual-rated for air or water service.', S::SLUG_AIR_RUBBER, [
            ['label' => 'Construction', 'value' => 'Mandrel built'],
            ['label' => 'Compliance', 'value' => 'FRAS certified for underground mining use'],
        ]),
        $hose('hot-air-suction-hose-mandrel-built', 'Hot Air Suction Hose — Mandrel Built', 'Mandrel-built hose for suction of hot air in drying equipment, hot blast systems, and industrial processes. Helix wire reinforcement prevents collapse under suction.', S::SLUG_AIR_RUBBER, [
            ['label' => 'Construction', 'value' => 'Mandrel built'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord + helix wire'],
        ]),
        $hose('compressed-air-hose-extrusion-built', 'Compressed Air Hose — Extrusion Built', 'Extrusion-built compressed air hose for workshops, light industries, and pneumatic tool supply. Lighter duty than mandrel-built version.', S::SLUG_AIR_RUBBER, [
            ['label' => 'Construction', 'value' => 'Extrusion built'],
            ['label' => 'Application', 'value' => 'Intermittent, lower pressure air supply lines'],
        ]),
        $hose('hot-air-hose-extrusion-built', 'Hot Air Hose — Extrusion Built', 'Extrusion-built hose for conveying heated air in drying, curing, and heating systems.', S::SLUG_AIR_RUBBER, [
            ['label' => 'Construction', 'value' => 'Extrusion built'],
            ['label' => 'Tube', 'value' => 'High-temp rated inner compound'],
        ]),
        $hose('multipurpose-air-water-hose', 'Multipurpose Air / Water Hose', 'General-purpose extrusion-built hose for both compressed air and water. Suitable for construction sites, workshops, agriculture, and general industrial use.', S::SLUG_AIR_RUBBER, [
            ['label' => 'Construction', 'value' => 'Extrusion built'],
            ['label' => 'Key Feature', 'value' => 'Flexible at low temperatures'],
        ]),
        $hose('fuel-oil-discharge-hose-20-bar', 'Fuel / Oil Discharge Hose — 20 Bar WP', 'Softwall hose for delivery of petroleum products with aromatic content up to 50%. Fuel connector service at filling stations and tank trucks.', S::SLUG_PETROLEUM, [
            ['label' => 'Working Pressure', 'value' => '20 Bar'],
            ['label' => 'Tube', 'value' => 'Black smooth nitrile rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord'],
            ['label' => 'Construction', 'value' => 'Softwall'],
        ]),
        $hose('fuel-oil-discharge-hose-low-temp', 'Fuel / Oil Discharge Hose — Low Temperature Grade', 'Hardwall mandrel-built hose for suction and delivery of petroleum fuels with aromatic content up to 50%, rated for low-temperature environments.', S::SLUG_PETROLEUM, [
            ['label' => 'Temperature', 'value' => '-45°C to +70°C'],
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord and helix wire'],
            ['label' => 'Construction', 'value' => 'Hardwall mandrel built'],
        ]),
        $hose('tank-truck-fuel-hose-standard', 'Tank Truck Fuel Hose — Standard Grade', 'Hardwall mandrel-built hose for suction and delivery of petroleum fuels (aromatic content up to 50%) for tank trucks in standard temperature service.', S::SLUG_PETROLEUM, [
            ['label' => 'Temperature', 'value' => '-20°C to +70°C'],
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord and helix wire'],
            ['label' => 'Cover', 'value' => 'Black corrugated, weathering and ozone resistant'],
            ['label' => 'Construction', 'value' => 'Hardwall mandrel built'],
        ]),
        $hose('petroleum-hydraulic-fluid-suction-hose', 'Petroleum & Hydraulic Fluid Suction Hose', 'Hardwall mandrel-built hose for petroleum products and water-based hydraulic fluids in low pressure and vacuum service.', S::SLUG_PETROLEUM, [
            ['label' => 'Temperature', 'value' => '-40°C to +100°C'],
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord + helix wire'],
            ['label' => 'Cover', 'value' => 'Black smooth (wrapped finish), weathering and ozone resistant'],
            ['label' => 'Construction', 'value' => 'Hardwall mandrel built'],
        ]),
        $hose('dock-petroleum-suction-discharge-hose', 'Dock Petroleum Suction & Discharge Hose', 'Heavy duty suction and discharge dock hose for transferring petroleum products from tankers and barges, bunkering service, and industrial applications.', S::SLUG_PETROLEUM, [
            ['label' => 'Temperature', 'value' => '-20°C to +82°C'],
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber, aromatic content up to 50%'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord, helix wire'],
            ['label' => 'Construction', 'value' => 'Hardwall mandrel built; large diameter available'],
        ]),
        $hose('multipurpose-oil-hose', 'Multipurpose Oil Hose', 'Versatile hose for conveying air, water, and oil. Used in mining, agriculture, and construction.', S::SLUG_PETROLEUM, [
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic yarn'],
            ['label' => 'Application', 'value' => 'Low pressure hydraulic oil lines, pneumatic lines'],
        ]),
        $hose('xlpe-chemical-discharge-hose', 'XLPE Chemical Discharge Hose', 'Softwall hose with cross-linked polyethylene (XLPE) lining for delivery of a wide range of chemicals, petroleum products, and oils.', S::SLUG_CHEMICAL, [
            ['label' => 'Tube', 'value' => 'White smooth XLPE lining'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord'],
            ['label' => 'Chemical Resistance', 'value' => 'Resistant to most organic chemicals, solvents, acids, and bases'],
        ]),
        $hose('water-suction-discharge-hardwall-heavy-duty', 'Water Suction & Discharge Hose — Hardwall Heavy Duty', 'Hardwall mandrel-built hose for suction and discharge of water and non-corrosive fluids on construction sites and light duty industrial applications.', S::SLUG_WATER_SUCTION, [
            ['label' => 'Temperature', 'value' => '-20°C to +70°C'],
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord and helix wire'],
            ['label' => 'Cover', 'value' => 'Black smooth (wrapped finish), weathering and ozone resistant'],
            ['label' => 'Construction', 'value' => 'Hardwall mandrel built'],
        ]),
        $hose('water-suction-discharge-light-duty', 'Water Suction & Discharge Hose — Light Duty', 'Softwall extrusion-built hose for water and non-corrosive fluids in construction sites and light duty industrial applications.', S::SLUG_WATER_SUCTION, [
            ['label' => 'Temperature', 'value' => '-20°C to +70°C'],
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic yarn'],
            ['label' => 'Cover', 'value' => 'Black smooth synthetic rubber, weathering and ozone resistant'],
            ['label' => 'Construction', 'value' => 'Softwall (extrusion built)'],
        ]),
        $hose('wastewater-sewage-discharge-layflat', 'Wastewater / Sewage Discharge Layflat Hose', 'Lightweight lay-flat softwall hose for discharge of waste water and domestic applications.', S::SLUG_WATER_DISCHARGE, [
            ['label' => 'Temperature', 'value' => '-20°C to +60°C'],
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord'],
            ['label' => 'Cover', 'value' => 'Black smooth (wrapped finish), weathering and ozone resistant'],
            ['label' => 'Construction', 'value' => 'Layflat softwall'],
        ]),
        $hose('fire-fighting-system-hose', 'Fire Fighting System Hose', 'Designed for fixed fire-fighting systems (sprinkler supply lines, deluge systems, standpipes). Not a handheld attack hose — fixed system service.', S::SLUG_FIRE_MILL, [
            ['label' => 'Temperature', 'value' => '-20°C to +60°C'],
            ['label' => 'Tube', 'value' => 'Black smooth synthetic rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic yarn'],
            ['label' => 'Cover', 'value' => 'Black smooth synthetic rubber, weathering and ozone resistant'],
        ]),
        $hose('steam-hose-epdm-softwall', 'Steam Hose (EPDM, Softwall)', 'Softwall hose for delivery of steam and hot water in industrial processes, steam cleaning, and vulcanizing operations.', S::SLUG_STEAM, [
            ['label' => 'Tube', 'value' => 'Black smooth EPDM rubber'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord'],
            ['label' => 'Cover', 'value' => 'Blue smooth (wrapped finish), EPDM rubber'],
            ['label' => 'Standard', 'value' => 'ISO 6945 for steam hose'],
            ['label' => 'Key Feature', 'value' => 'Excellent resistance to heat, steam, and ozone'],
        ]),
        $hose('twin-welding-hose-oxygen-acetylene', 'Twin Welding Hose — Oxygen / Acetylene', 'Twin-line hose assembly for simultaneous delivery of oxygen and acetylene to gas welding/cutting torches.', S::SLUG_MISC_HOSE, [
            ['label' => 'Color Code', 'value' => 'Red (acetylene/fuel gas) + Green or Blue (oxygen) — twin bonded'],
            ['label' => 'Standard', 'value' => 'EN 559 / ISO 3821'],
        ]),
        $hose('oxygen-hose-single-line', 'Oxygen Hose — Single Line', 'Single-line hose for oxygen delivery in welding and cutting operations.', S::SLUG_MISC_HOSE, [
            ['label' => 'Standard', 'value' => 'EN 559 / ISO 3821'],
        ]),
        $hose('acetylene-propane-hose-single-line', 'Acetylene / Propane Hose — Single Line', 'Single-line hose for acetylene or propane fuel gas delivery in welding, cutting, and heating operations.', S::SLUG_MISC_HOSE, [
            ['label' => 'Standard', 'value' => 'EN 559 / ISO 3821'],
        ]),
        $hose('uhmwpe-chemical-discharge-hose', 'UHMWPE Chemical Discharge Hose', 'Hose with Ultra High Molecular Weight Polyethylene (UHMWPE) lining for chemical transfer. Broader chemical resistance than XLPE.', S::SLUG_CHEMICAL, [
            ['label' => 'Tube', 'value' => 'White smooth UHMWPE lining'],
            ['label' => 'Reinforcement', 'value' => 'High strength synthetic cord'],
            ['label' => 'Chemical Resistance', 'value' => 'Handles aggressive acids, solvents, ketones, and esters'],
        ]),
        $hose('dairy-beverage-food-grade-hose', 'Dairy / Beverage Food Grade Hose', 'FDA/food-compliant hose for dairy product transfer — milk, cream, yogurt. Smooth inner bore prevents bacteria trapping.', S::SLUG_FOOD_RUBBER, [
            ['label' => 'Compliance', 'value' => 'FDA-approved compound'],
        ]),
        $hose('cooking-oil-food-grade-hose', 'Cooking Oil Food Grade Hose', 'Food-grade hose rated for transfer of edible oils, cooking oil, vegetable oil, and palm oil.', S::SLUG_FOOD_RUBBER, [
            ['label' => 'Compliance', 'value' => 'FDA-approved inner tube compound'],
        ]),
        $hose('marine-wet-exhaust-hose', 'Marine Wet Exhaust Hose', 'Seawater-resistant hose for marine engine wet exhaust discharge. Handles mixed water and exhaust gases.', S::SLUG_MARINE, [
            ['label' => 'Cover', 'value' => 'Saltwater resistant outer cover'],
        ]),
        $hose('marine-fuel-hose', 'Marine Fuel Hose', 'Fuel delivery hose for marine engine systems — diesel and petrol. Saltwater and oil resistant.', S::SLUG_PETROLEUM, [
            ['label' => 'Application', 'value' => 'Marine engine fuel systems'],
        ]),
        $hose('air-brake-hose', 'Air Brake Hose', 'Rubber air hose for vehicle air brake systems on trucks, buses, and heavy commercial vehicles.', S::SLUG_AIR_RUBBER, [
            ['label' => 'Standard', 'value' => 'SAE J1402 / FMVSS 106'],
        ]),
        $hose('radiator-coolant-hose', 'Radiator Coolant Hose', 'Upper and lower radiator hoses for engine coolant circulation in vehicles and heavy equipment.', S::SLUG_AIR_RUBBER),
        $hose('car-heater-hose', 'Car Heater Hose', 'Automotive cabin heater coolant hose with heat-resistant EPDM construction.', S::SLUG_AIR_RUBBER, [
            ['label' => 'Construction', 'value' => 'Heat-resistant EPDM'],
        ]),
    ]
);
