<?php

use Database\Seeders\CatalogSupplierProducts as S;
use Database\Seeders\SupplierProductDefinition as P;

$flexco = static fn (string $slug, string $name, string $description, string $subcategory, array $specs = []) => P::make($subcategory, $name, [
    'slug' => $slug,
    'description' => $description,
    'brand' => 'Flexco',
    'material' => 'Synthetic',
    'source' => 'Flexco',
    'source_url' => 'flexco.com',
    'specs' => $specs,
]);

return [
    P::make(S::SLUG_NOZZLES, 'Brass Fire Hose Nozzle', [
        'slug' => 'brass-fire-hose-nozzle',
        'description' => 'Solid brass fire hose discharge nozzle in straight stream and adjustable fog patterns.',
        'material' => 'Brass',
        'source' => 'Seapeak',
        'source_url' => 'seapeakhose.com',
        'specs' => [
            ['label' => 'Material', 'value' => 'Brass'],
            ['label' => 'Types', 'value' => 'Straight stream, adjustable fog'],
        ],
    ]),
    P::make(S::SLUG_NOZZLES, 'Plastic Fire Hose Nozzle', [
        'slug' => 'plastic-fire-hose-nozzle',
        'description' => 'High-impact polymer fire hose nozzle — lightweight alternative to brass.',
        'material' => 'Synthetic',
        'source' => 'Seapeak',
        'source_url' => 'seapeakhose.com',
        'specs' => [
            ['label' => 'Material', 'value' => 'High-impact polymer'],
            ['label' => 'Application', 'value' => 'Cabinet hose, forestry, lightweight attack lines'],
        ],
    ]),
    $flexco('clipper-wire-hook-fastening', 'Clipper Wire Hook Fastening System', 'Wire hook mechanical belt fastener for fabric conveyor belts without a vulcanizing press.', S::SLUG_FASTENERS_CLIPPER, [
        ['label' => 'Application', 'value' => 'Light to medium duty fabric conveyor belt splicing'],
        ['label' => 'Installation', 'value' => 'Hammered or press-applied using Clipper tools'],
    ]),
    $flexco('flexco-alligator-belt-fasteners', 'Flexco Alligator Belt Fasteners', 'Plate-style mechanical fastener for medium to heavy duty conveyor belt splicing.', S::SLUG_FASTENERS_FLEXCO, [
        ['label' => 'Size Range', 'value' => 'Belt thickness 1/16" to 1"'],
    ]),
    $flexco('novitool-aero-splicing-system', 'Novitool Aero Endless Splicing System', 'Hot or cold vulcanizing endless splice system for light and medium conveyor belts.', S::SLUG_BELT_SPLICE, [
        ['label' => 'Feature', 'value' => 'Optional connectivity dashboard for press monitoring'],
    ]),
    $flexco('impact-beds-skirting-systems', 'Flexco Impact Beds & Skirting Systems', 'Loading zone impact beds and skirting seals to control spillage and dust.', S::SLUG_SKIRTBOARD, [
        ['label' => 'Components', 'value' => 'UHMW seals, impact cradles/bars, skirtboard clamps'],
    ]),
    $flexco('pulley-lagging-bondable-weld-on', 'Flexco Pulley Lagging (Bondable & Weld-On)', 'Rubber and ceramic lagging for drive, tail, and snub pulleys.', S::SLUG_PULLEY_LAGGING, [
        ['label' => 'Types', 'value' => 'Bondable rubber, bondable ceramic, weld-on rubber'],
    ]),
    $flexco('belt-cleaning-systems', 'Flexco Belt Cleaning Systems (Primary & Secondary)', 'Belt cleaners to remove carryback from conveyor return runs.', S::SLUG_MISC_CONVEYOR, [
        ['label' => 'Blade Materials', 'value' => 'Urethane, tungsten carbide tipped'],
    ]),
    $flexco('belt-positioners-trackers', 'Flexco Belt Positioners, Trackers & Trainers', 'Self-correcting belt trainers for carry and return runs.', S::SLUG_MISC_CONVEYOR),
    $flexco('belt-maintenance-tools', 'Flexco Belt Maintenance Tools', 'Belt cutters, lacing strips, installation tools, and tension measuring tools.', S::SLUG_MISC_CONVEYOR),
];
