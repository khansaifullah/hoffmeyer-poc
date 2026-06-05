<?php

use Database\Seeders\CatalogSupplierProducts as S;
use Database\Seeders\SupplierProductDefinition as P;

$dixon = 'Dixon Valve & Coupling';
$dixonUrl = 'dixonvalve.com';

$dixonProduct = static function (
    string $slug,
    string $name,
    string $description,
    string $subcategory,
    array $specs = [],
    ?string $mfrNumber = null,
    ?string $material = 'Aluminum'
) use ($dixon, $dixonUrl) {
    return P::make($subcategory, $name, [
        'slug' => $slug,
        'description' => $description,
        'material' => $material,
        'brand' => 'Dixon',
        'mfr_number' => $mfrNumber,
        'source' => $dixon,
        'source_url' => $dixonUrl,
        'specs' => $specs,
    ]);
};

return [
    $dixonProduct('dixon-type-e-cam-groove-coupler-aluminum', 'Dixon Global Type E Cam & Groove Coupler (Female) — Aluminum', 'Female coupler × female NPT cam and groove coupling in A380 permanent mold aluminum. Interchanges with standard cam and groove per A-A-59326D.', S::SLUG_CAM_GROOVE, [
        ['label' => 'Type', 'value' => 'E = Female Coupler × Female NPT'],
        ['label' => 'Material', 'value' => 'A380 Aluminum (permanent mold)'],
        ['label' => 'Standard', 'value' => 'A-A-59326D'],
        ['label' => 'Seals', 'value' => 'Buna (standard)'],
        ['label' => 'Part Numbers', 'value' => 'G50-E-AL through G800-E-AL (1/2" to 8")'],
    ]),
    $dixonProduct('dixon-type-e-cam-groove-coupler-brass', 'Dixon Global Type E Cam & Groove Coupler (Female) — Brass', 'Female coupler × female NPT cam and groove coupling in forged brass (ASTM C38000).', S::SLUG_CAM_GROOVE, [
        ['label' => 'Type', 'value' => 'E = Female Coupler × Female NPT'],
        ['label' => 'Material', 'value' => 'Forged Brass (ASTM C38000)'],
        ['label' => 'Part Numbers', 'value' => 'G50-E-BR through G500-E-BR'],
    ], null, 'Brass'),
    $dixonProduct('dixon-type-e-cam-groove-coupler-316ss', 'Dixon Global Type E Cam & Groove Coupler (Female) — 316 Stainless Steel', 'Female coupler × female NPT cam and groove coupling in 316 investment cast stainless steel.', S::SLUG_CAM_GROOVE, [
        ['label' => 'Type', 'value' => 'E = Female Coupler × Female NPT'],
        ['label' => 'Material', 'value' => '316 Investment Cast Stainless Steel'],
        ['label' => 'Part Numbers', 'value' => 'G50-E-SS through G600-E-SS'],
    ], null, 'Stainless Steel'),
    $dixonProduct('dixon-type-f-cam-groove-adapter-aluminum', 'Dixon Global Type F Cam & Groove Adapter (Male) — Aluminum', 'Male adapter × male NPT cam and groove fitting in A380 aluminum per A-A-59326D.', S::SLUG_CAM_GROOVE, [
        ['label' => 'Type', 'value' => 'F = Male Adapter × Male NPT'],
        ['label' => 'Material', 'value' => 'A380 Aluminum'],
        ['label' => 'Standard', 'value' => 'A-A-59326D'],
        ['label' => 'Part Numbers', 'value' => 'G50-F-AL through G600-F-AL'],
    ]),
    $dixonProduct('dixon-type-f-cam-groove-adapter-brass', 'Dixon Global Type F Cam & Groove Adapter (Male) — Brass', 'Male adapter × male NPT cam and groove fitting in forged brass.', S::SLUG_CAM_GROOVE, [
        ['label' => 'Type', 'value' => 'F = Male Adapter × Male NPT'],
        ['label' => 'Material', 'value' => 'Forged Brass'],
        ['label' => 'Part Numbers', 'value' => 'G50-F-BR through G500-F-BR'],
    ], null, 'Brass'),
    $dixonProduct('dixon-type-f-cam-groove-adapter-316ss', 'Dixon Global Type F Cam & Groove Adapter (Male) — 316 Stainless', 'Male adapter × male NPT cam and groove fitting in 316 stainless steel. Hastelloy available for highly corrosive applications.', S::SLUG_CAM_GROOVE, [
        ['label' => 'Type', 'value' => 'F = Male Adapter × Male NPT'],
        ['label' => 'Material', 'value' => '316 Stainless Steel'],
        ['label' => 'Part Numbers', 'value' => 'G50-F-SS through G600-F-SS'],
        ['label' => 'Options', 'value' => 'Hastelloy available for highly corrosive service'],
    ], null, 'Stainless Steel'),
    $dixonProduct('dixon-boss-lock-ez-venting-type-c-2in', 'Dixon Boss-Lock EZ Venting Cam & Groove Type C Coupler — Aluminum 2"', 'Venting EZ Boss-Lock releases vapor pressure before disconnecting for safer handling of volatile or pressurized media. Swivel option available.', S::SLUG_CAM_GROOVE, [
        ['label' => 'MFR Part Number', 'value' => 'RC200EZSWIV (swivel); 2" Type C 356T6 Aluminum (standard)'],
        ['label' => 'Type', 'value' => 'C = Female Coupler × Hose Shank'],
        ['label' => 'Material', 'value' => '356T6 Aluminum'],
        ['label' => 'Size', 'value' => '2"'],
    ], 'RC200EZSWIV'),
    $dixonProduct('dixon-boss-ground-joint-gf36', 'Dixon Boss Ground Joint — GF36', 'Boss-style ground joint coupling for hose-to-pipe connections. Positive ground metal seal — no gasket required.', S::SLUG_MISC_FITTINGS, [
        ['label' => 'MFR Part Number', 'value' => 'GF36'],
        ['label' => 'Seal Type', 'value' => 'Positive ground metal seal — no gasket required'],
    ], 'GF36', 'Steel'),
    $dixonProduct('dixon-ht-series-coupling-4htf4', 'Dixon HT-Series Coupling — 4HTF4', 'HT (High Torque) series hose coupling for demanding high-pressure applications.', S::SLUG_MISC_FITTINGS, [
        ['label' => 'MFR Part Number', 'value' => '4HTF4'],
    ], '4HTF4', 'Steel'),
    $dixonProduct('dixon-sanitary-clamp-hose-shank-cssr200cs', 'Dixon Stainless Sanitary Clamp End × Hose Shank Stem — CSSR200CS', 'Sanitary/hygienic stainless steel fitting — clamp end (tri-clamp) × hose shank for food, beverage, dairy, and pharmaceutical hose connections.', S::SLUG_MISC_FITTINGS, [
        ['label' => 'MFR Part Number', 'value' => 'CSSR200CS'],
        ['label' => 'Application', 'value' => 'Food, beverage, dairy, and pharmaceutical hose connections'],
    ], 'CSSR200CS', 'Stainless Steel'),
    $dixonProduct('dixon-cam-groove-handle-assembly-g152hrp', 'Dixon Cam & Groove Handle Assembly — G152HRP', 'Replacement handle assembly for aluminum and brass Global Cam & Groove couplers. Dixon-exclusive — only fits Dixon Global parts.', S::SLUG_CAM_GROOVE, [
        ['label' => 'MFR Part Number', 'value' => 'G152HRP'],
        ['label' => 'Compatibility', 'value' => 'Dixon Global aluminum and brass couplers only'],
        ['label' => 'Note', 'value' => 'CA Prop 65 warning — contains lead'],
    ], 'G152HRP'),
];
