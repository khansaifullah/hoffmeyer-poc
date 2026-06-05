<?php

use Database\Seeders\CatalogSupplierProducts as S;
use Database\Seeders\SupplierProductDefinition as P;

$shuangma = 'Shuangma Rubber Co., Ltd.';
$hosebelt = 'hosebelt.com';

return [
    P::make(S::SLUG_BELT_INCLINE, 'Chevron Conveyor Belt (Open Type)', [
        'slug' => 'chevron-conveyor-belt-open-type',
        'description' => 'Incline conveying belt with integrally moulded open cleats for bulk and bagged materials at inclinations up to 45°. Open cleat design suits powder and granule materials that need airflow through the profile.',
        'material' => 'Rubber',
        'source' => $shuangma,
        'source_url' => $hosebelt,
        'specs' => [
            ['label' => 'Application', 'value' => 'Incline conveying of bulk and bagged materials up to 45°; powder and granule service'],
            ['label' => 'Tensile Strength', 'value' => '≥10 MPa'],
            ['label' => 'Elongation at Break', 'value' => '≥350%'],
            ['label' => 'Adhesive Strength (Carcass)', 'value' => '≥6.0 N/mm'],
            ['label' => 'Adhesive Strength (Cover to Carcass)', 'value' => '≥3.0 N/mm'],
            ['label' => 'Elasticity', 'value' => '≥32%'],
            ['label' => 'Abrasion', 'value' => '≤200 mm³'],
            ['label' => 'Construction', 'value' => 'Integrally moulded cleats prevent material from sliding back'],
        ],
    ]),
    P::make(S::SLUG_BELT_INCLINE, 'Chevron Conveyor Belt (Closed Type)', [
        'slug' => 'chevron-conveyor-belt-closed-type',
        'description' => 'Incline conveying belt with closed cleat design for fine powders, granules, and materials that would spill through open cleats. Same incline service as open type with improved containment.',
        'material' => 'Rubber',
        'source' => $shuangma,
        'source_url' => $hosebelt,
        'specs' => [
            ['label' => 'Application', 'value' => 'Incline conveying up to 45°; fine powders, granules, and spill-sensitive materials'],
            ['label' => 'Tensile Strength', 'value' => '≥10 MPa'],
            ['label' => 'Elongation at Break', 'value' => '≥350%'],
            ['label' => 'Adhesive Strength (Carcass)', 'value' => '≥6.0 N/mm'],
            ['label' => 'Adhesive Strength (Cover to Carcass)', 'value' => '≥3.0 N/mm'],
            ['label' => 'Elasticity', 'value' => '≥32%'],
            ['label' => 'Abrasion', 'value' => '≤200 mm³'],
            ['label' => 'Cleat Design', 'value' => 'Closed type for materials that would spill through open cleats'],
        ],
    ]),
    P::make(S::SLUG_BELT_HEAVY, 'Cross Stabilized (Rigid) Conveyor Belt', [
        'slug' => 'cross-stabilized-rigid-conveyor-belt',
        'description' => 'Designed to bend efficiently in the longitudinal direction while maintaining greater rigidity in the transverse direction. Uses reinforced fabrics with monofilament creating a high-tension carcass. Ideal where lateral belt stiffness is required, such as pipe conveyor systems or troughing applications with high fill angles.',
        'material' => 'Rubber',
        'source' => $shuangma,
        'source_url' => $hosebelt,
        'specs' => [
            ['label' => 'Key Feature', 'value' => 'High transverse rigidity with longitudinal flexibility'],
            ['label' => 'Carcass', 'value' => 'Reinforced fabrics with monofilament high-tension construction'],
            ['label' => 'Typical Applications', 'value' => 'Pipe conveyors, high fill-angle troughing'],
        ],
    ]),
    P::make(S::SLUG_BELT_HEAVY, 'Rip-Stop Conveyor Belt', [
        'slug' => 'rip-stop-conveyor-belt',
        'description' => 'Has a reinforcement layer placed between the top cover and the carcass to protect the belt from cutting or slitting through the warp direction. Designed for applications where sharp materials (rock, ore, scrap metal) could puncture or tear a standard belt. The rip-stop layer stops any cut from propagating across the belt width.',
        'material' => 'Rubber',
        'source' => $shuangma,
        'source_url' => $hosebelt,
        'specs' => [
            ['label' => 'Application', 'value' => 'Rock, ore, scrap metal, and other sharp or abrasive materials'],
            ['label' => 'Reinforcement', 'value' => 'Rip-stop layer between top cover and carcass'],
            ['label' => 'Key Benefit', 'value' => 'Stops cuts from propagating across belt width'],
        ],
    ]),
    P::make(S::SLUG_BELT_TRANS_PKG, 'Endless Conveyor Belt', [
        'slug' => 'endless-conveyor-belt',
        'description' => 'Conveyor belt supplied as a pre-joined endless loop — no on-site splicing required. Manufactured to exact length specification. Suited for high-speed, light-duty applications such as food processing, packaging, and parcel handling where a seamless surface is required.',
        'material' => 'Rubber',
        'source' => $shuangma,
        'source_url' => $hosebelt,
        'specs' => [
            ['label' => 'Supply Form', 'value' => 'Pre-joined endless loop — no on-site splicing'],
            ['label' => 'Application', 'value' => 'Food processing, packaging, parcel handling'],
            ['label' => 'Service Type', 'value' => 'High-speed, light-duty with seamless carrying surface'],
        ],
    ]),
];
