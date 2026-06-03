<?php

use Database\Seeders\CatalogSupplierProducts as S;
use Database\Seeders\SupplierProductDefinition as P;

$mattingSpecs = [
    ['label' => 'Width', 'value' => '1–2 m (variant dependent)'],
    ['label' => 'Thickness', 'value' => '3–6 mm'],
    ['label' => 'Colors', 'value' => 'Black, green, red'],
    ['label' => 'Hardness', 'value' => 'Shore A 45–85'],
    ['label' => 'Tensile Strength', 'value' => '4 MPa'],
    ['label' => 'Elongation', 'value' => '180%'],
];

return [
    P::make(S::SLUG_SHEET_RED, 'SBR Rubber Sheet', [
        'slug' => 'sbr-rubber-sheet',
        'description' => 'Styrene-butadiene rubber sheet. Economical general-purpose rubber with excellent abrasion, wear, and tensile qualities. Resilience comparable to natural rubber. Can substitute for natural rubber in many applications.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Dimensions', 'value' => 'Width up to 2000 mm; length 1–300 m; thickness 1–50 mm'],
            ['label' => 'Colors', 'value' => 'Black, red'],
            ['label' => 'Hardness', 'value' => 'Shore A 50–85'],
            ['label' => 'Tensile Strength', 'value' => '48 kgf/cm² (JIS K6301)'],
            ['label' => 'Elongation', 'value' => '275%'],
            ['label' => 'Options', 'value' => 'Fabric insertion available on request'],
        ],
    ]),
    P::make(S::SLUG_SHEET_CLOTH, 'Rubber Sheet with Fabric Insertion', [
        'slug' => 'rubber-sheet-fabric-insertion',
        'description' => 'Reinforced rubber sheet with embedded fabric plies for added dimensional stability and tensile strength. Suitable for high-pressure gaskets, lining, and heavy-duty applications.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => [
            ['label' => 'Dimensions', 'value' => 'Width ≤2000 mm; length ≤300 m; thickness 1.8–80 mm'],
            ['label' => 'Hardness', 'value' => 'Shore A 45–85'],
            ['label' => 'Tensile Strength', 'value' => '2–25 MPa'],
            ['label' => 'Elongation', 'value' => '≥180%'],
            ['label' => 'Fabric Types', 'value' => 'NN100–NN300; EP100–EP400'],
            ['label' => 'Insertion Plies', 'value' => '1 through 6+ (custom)'],
        ],
    ]),
    P::make(S::SLUG_SHEET_MATTING, 'Stud Rubber Sheet (Antifatigue Mat)', [
        'slug' => 'stud-rubber-sheet-antifatigue',
        'description' => 'Antifatigue matting rubber sheet with stud surface pattern for workplace flooring and equipment padding.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => array_merge([['label' => 'Pattern', 'value' => 'Stud']], $mattingSpecs),
    ]),
    P::make(S::SLUG_SHEET_MATTING, 'Checker / Diamond Rubber Sheet', [
        'slug' => 'checker-diamond-rubber-sheet',
        'description' => 'Antifatigue matting with checker/diamond surface pattern.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => array_merge([['label' => 'Pattern', 'value' => 'Checker / diamond']], $mattingSpecs),
    ]),
    P::make(S::SLUG_SHEET_MATTING, 'Fine Ribbed Rubber Sheet', [
        'slug' => 'fine-ribbed-rubber-sheet',
        'description' => 'Antifatigue matting with fine ribbed surface pattern.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => array_merge([['label' => 'Pattern', 'value' => 'Fine ribbed']], $mattingSpecs),
    ]),
    P::make(S::SLUG_SHEET_MATTING, 'Wide Ribbed Rubber Sheet', [
        'slug' => 'wide-ribbed-rubber-sheet',
        'description' => 'Antifatigue matting with wide ribbed surface pattern.',
        'material' => 'Rubber',
        'source' => 'Shuangma Rubber Co., Ltd.',
        'source_url' => 'hosebelt.com',
        'specs' => array_merge([['label' => 'Pattern', 'value' => 'Wide ribbed']], $mattingSpecs),
    ]),
];
